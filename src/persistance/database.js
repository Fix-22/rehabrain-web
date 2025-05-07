const mysql = require("mysql2");

const generateDatabase = () => {
    let connection;

    const executeQuery = (sql) => {
        return new Promise((resolve, reject) => {
            connection.query(sql, function (err, result) {
                if (err) {
                    console.error("Database error: " + err + " on query: " + sql);
                    reject();
                }
                
                resolve(result);
            });
        })
    };
    
    const executeStatement = (sql, params) => {
        return new Promise((resolve, reject) => {
            connection.query(sql, params, function (err, result) {
                if (err) {
                    console.error("Database error: " + err + " on query: " + sql);
                    reject();
                }
                
                resolve(result);
            });
        })
    };

    return {
        build: (databaseConfig) => {
            connection = mysql.createConnection(databaseConfig);
        },
        createTables: async () => {
            try {
                await executeQuery(`
                    create table if not exists Categories(
                        Name varchar(50) primary key
                    );    
                `);
                await executeQuery(`
                    create table if not exists Difficulties(
                        Difficulty varchar(50) primary key
                    );    
                `);
                await executeQuery(`
                    create table if not exists Contents(
                        Name varchar(150) primary key,
                        LinkedImage varchar(200) not null,
                        Color varchar(6),
                        CategoryName varchar(50),
                        Difficulty varchar(50),
                        foreign key (CategoryName) references Categories(Name) on update cascade on delete set null,
                        foreign key (Difficulty) references Difficulties(Difficulty)
                    );    
                `);
                await executeQuery(`
                    create table if not exists Activities(
                        ID int primary key auto_increment,
                        Name varchar(100) not null,
                        Description text(2000) not null,
                        MaxMediumScore int(4),
                        Difficulty varchar(50),
                        foreign key (Difficulty) references Difficulties(Difficulty)
                    );    
                `);
                await executeQuery(`
                    create table if not exists Users(
                        Email varchar(100) primary key,
                        Name varchar(100) not null,
                        Surname varchar(100) not null,
                        Password varchar(44) not null,
                        isAdministrator bool not null
                    );    
                `);
                await executeQuery(`
                    create table if not exists Patients(
                        ID int primary key auto_increment,
                        Name varchar(100) not null,
                        Surname varchar(100) not null,
                        Age int(3) not null,
                        Notes text(5000),
                        Caregiver varchar(100) not null,
                        foreign key (Caregiver) references Users(Email)
                    );    
                `);
                await executeQuery(`
                    create table if not exists CurrentSessions(
                        PatientID int,
                        ActivityID int,
                        Times int not null check (Times > 0),
                        Position int not null check (Position >= 0),
                        foreign key (PatientID) references Patients(ID) on update cascade on delete cascade,
                        foreign key (ActivityID) references Activities(ID) on update cascade on delete cascade,
                        constraint pk_cs primary key (PatientID, ActivityID)
                    );    
                `);
                await executeQuery(`
                    create table if not exists SessionsScores(
                        ID int primary key auto_increment,
                        Score int(4) not null,
                        PlayDate date not null,
                        PatientID int not null,
                        foreign key (PatientID) references Patients(ID) on update cascade on delete cascade
                    );    
                `);
            }
            catch (e) {
                console.error("Database error while creating tables: " + e);
            }
        },
        login: async (email, password) => {
            try {
                const result = await executeStatement(`
                    SELECT *
                    FROM Users
                    WHERE Email = ? AND Password = ?;
                `, [email, password]);
                
                return result;
            }
            catch (e) {
                console.error("Database error: " + e);
            }
        },
        register: async (userData) => {
            try {
                const result = await executeStatement(`
                    INSERT INTO Users
                    VALUES(?, ?, ?, ?, ?);
                `, [userData.email, userData.name, userData.surname, userData.password, false]);
                
                return result.affectedRows;
            }
            catch (e) {
                console.error("Database error: " + e);
            }
        },
        editAccount: async (personalData) => {
            try {
                const result = await executeStatement(`
                    UPDATE Users
                    SET Name = ?, Surname = ?
                    WHERE Email = ? AND Password = ?;
                `, [personalData.name, personalData.surname, personalData.email, personalData.password]);
                
                return result.affectedRows;
            }
            catch (e) {
                console.error("Database error: " + e);
            }
        },
        deleteAccount: async (email, password) => {
            try {
                const result = await executeStatement(`
                    DELETE FROM Users
                    WHERE Email = ? AND Password = ?;
                `, [email, password]);
                
                return result.affectedRows;
            }
            catch (e) {
                console.error("Database error: " + e);
            }
        },
        getAccount: async (email, password) => {
            try {
                const result = await executeStatement(`
                    SELECT Email, Name, Surname
                    FROM Users
                    WHERE Email = ? AND Password = ?;
                `, [email, password]);
                
                return result;
            }
            catch (e) {
                console.error("Database error: " + e);
            }
        },
        getActivities: async () => {
            try {
                const result = await executeQuery(`
                    SELECT *
                    FROM Activities;
                `);
                
                return result;
            }
            catch (e) {
                console.error("Database error: " + e);
            }
        },
        getContents: async (category, difficulty) => {
            try {
                const result = await executeStatement(`
                    SELECT *
                    FROM Contents
                    WHERE CategoryName = ? AND Difficulty = ?;
                `, [category, difficulty]);
                
                return result;
            }
            catch (e) {
                console.error("Database error: " + e);
            }
        },
        getAllPatients: async (email, password) => {
            try {
                const result = await executeStatement(`
                    SELECT Patients.ID, Patients.Name, Patients.Surname, Age, Notes
                    FROM Patients JOIN Users ON Patients.Caregiver = Users.Email
                    WHERE Users.Email = ? and Users.Password = ?;
                `, [email, password]);
                
                return result;
            }
            catch (e) {
                console.error("Database error: " + e);
            }
        },
        createPatient: async (patientData, email, password) => {
            try {
                const result = await executeStatement(`
                    INSERT INTO Patients
                    (Name, Surname, Age, Notes, Caregiver)
                    VALUES(?, ?, ?, ?, (SELECT Email FROM Users WHERE Email = ? AND Password = ?));
                `, [patientData.name, patientData.surname, patientData.age, patientData.notes, email, password]);
                
                return result.affectedRows;
            }
            catch (e) {
                console.error("Database error: " + e);
            }
        },
        editPatient: async (patientData, email, password) => {
            try {
                const result = await executeStatement(`
                    UPDATE Patients
                    SET Name = ?, Surname = ?, Age = ?, Notes = ?
                    WHERE ID = ? AND Caregiver = (SELECT Email FROM Users WHERE Email = ? AND Password = ?);
                `, [patientData.name, patientData.surname, patientData.age, patientData.notes, patientData.id, email, password]);
    
                return result.affectedRows;
            }
            catch (e) {
                console.error("Database error: " + e);
            }
        },
        deletePatient: async (patientId, email, password) => {
            try {
                const result = await executeStatement(`
                    DELETE FROM Patients
                    WHERE ID = ? AND Caregiver = (SELECT Email FROM Users WHERE Email = ? AND Password = ?);
                `, [patientId, email, password]);
                
                return result.affectedRows;
            }
            catch (e) {
                console.error("Database error: " + e);
            }
        },
        getPatient: async (patientId, email, password) => {
            try {
                const result = await executeStatement(`
                    SELECT Patients.ID, Patients.Name, Patients.Surname, Age, Notes
                    FROM Patients JOIN Users ON Patients.Caregiver = Users.Email
                    WHERE ID = ? AND Caregiver = (SELECT Email FROM Users WHERE Email = ? AND Password = ?);
                `, [patientId, email, password]);
                
                return result;
            }
            catch (e) {
                console.error("Database error: " + e);
            }
        },
        saveSessionScore: async (sessionData, email, password) => {
            try {
                const result = await executeStatement(`
                    INSERT INTO SessionsScores
                    (Score, PlayDate, PatientID)
                    VALUES(?, ?, (SELECT Patients.ID
                                  FROM Patients JOIN Users ON Patients.Caregiver = Users.Email
                                  WHERE Email = ? AND Password = ? AND Patients.ID = ?)
                    );
                `, [sessionData.score, sessionData.playDate, email, password, sessionData.patientId]);
                
                return result.affectedRows;
            }
            catch (e) {
                console.error("Database error: " + e);
            }
        },
        deleteSessionScore: async (sessionId, patientId, email, password) => {
            try {
                const result = await executeStatement(`
                    DELETE FROM SessionsScores
                    WHERE ID = ? AND PatientID = (SELECT Patients.ID
                                                  FROM Patients JOIN Users ON Patients.Caregiver = Users.Email
                                                  WHERE Email = ? AND Password = ? AND Patients.ID = ?);
                `, [sessionId, email, password, patientId]);
                
                return result.affectedRows;
            }
            catch (e) {
                console.error("Database error: " + e);
            }
        },
        getSessionsScores: async (patientId, email, password) => {
            try {
                const result = await executeStatement(`
                    SELECT *
                    FROM SessionsScores
                    WHERE PatientID = (SELECT Patients.ID
                                       FROM Patients JOIN Users ON Patients.Caregiver = Users.Email
                                       WHERE Email = ? AND Password = ? AND Patients.ID = ?);
                `, [email, password, patientId]);
                
                return result;
            }
            catch (e) {
                console.error("Database error: " + e);
            }
        },
        saveCurrentSession: async (activity, position, patientId, email, password) => {
            try {
                await database.clearCurrentSession(patientId, email, password);
    
                const result = await executeStatement(`
                    INSERT INTO CurrentSessions
                    (ActivityID, Times, Position, PatientID)
                    VALUES(?, ?, ?, (SELECT Patients.ID
                                  FROM Patients JOIN Users ON Patients.Caregiver = Users.Email
                                  WHERE Email = ? AND Password = ? AND Patients.ID = ?)
                    );
                `, [activity.id, activity.times, position, email, password, patientId]);
                
                return result.affectedRows;
            }
            catch (e) {
                console.error("Database error: " + e);
            }
        },
        clearCurrentSession: async (patientId, email, password) => {
            try {
                await executeStatement(`
                    DELETE FROM CurrentSessions
                    WHERE PatientID = (SELECT Patients.ID
                                       FROM Patients JOIN Users ON Patients.Caregiver = Users.Email
                                       WHERE Email = ? AND Password = ? AND Patients.ID = ?);
                `, [email, password, patientId]);
            }
            catch (e) {
                console.error("Database error: " + e);
            }
        },
        getCurrentSession: async (patientId, email, password) => {
            try {
                const result = await executeStatement(`
                    SELECT Activities.ID, Activities.Name, Activities.Description, Activities.MaxMediumScore, Activities.Difficulty, Times, Position
                    FROM CurrentSessions JOIN Activities ON CurrentSessions.ActivityID = Activities.ID JOIN Patients ON CurrentSessions.PatientID = Patients.ID
                    WHERE PatientID = ? AND Caregiver = (SELECT Email FROM Users WHERE Email = ? AND Password = ?);
                `, [patientId, email, password]);
                
                return result;
            }
            catch (e) {
                console.error("Database error: " + e);
            }
        }
    }
}

module.exports = generateDatabase;