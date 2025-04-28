const fs = require("fs");
const mysql = require("mysql2");

const conf = JSON.parse(fs.readFileSync("conf.json"));
conf.db.ssl.ca = fs.readFileSync("./ca.pem");

const connection = mysql.createConnection(conf.db);

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

const database = {
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
                    foreign key (CategoryName) references Categories(Name),
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
                    foreign key (PatientID) references Patients(ID),
                    foreign key (ActivityID) references Activities(ID),
                    constraint pk_cs primary key (PatientID, ActivityID)
                );    
            `);
            await executeQuery(`
                create table if not exists SessionsScores(
                    ID int primary key auto_increment,
                    Score int(4) not null,
                    PlayDate date not null,
                    PatientID int not null,
                    foreign key (PatientID) references Patients(ID)
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
            
            return result;
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
    getActivities: async () => {
        try {
            const result = await executeQuery(`
                SELECT Name, Description, MaxMediumScore, Difficulty
                FROM Activities;
            `);
            
            return result;
        }
        catch (e) {
            console.error("Database error: " + e);
        }
    },
};

module.exports = database;