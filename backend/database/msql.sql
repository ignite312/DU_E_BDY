CREATE TABLE IF NOT EXISTS users(
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    type ENUM('tutor', 'student') NOT NULL,
    KEY (type)
);

-- adduser: A stored procedure to insert into the user table. This will be exposed to the express app
DELIMITER //

CREATE PROCEDURE adduser(
    IN p_username VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_type ENUM('tutor', 'student')
)
BEGIN
    INSERT INTO users(id, username, password, type)
    VALUES (UUID(), p_username, p_password, p_type);
END//

DELIMITER ;

CREATE TABLE IF NOT EXISTS desc_problems(
    id VARCHAR(255) PRIMARY KEY,
    creator VARCHAR(255),
    description VARCHAR(4096) NOT NULL,
    solution VARCHAR(4096),
    subject VARCHAR(255),
    tags VARCHAR(255),
    difficulty INT,
    FOREIGN KEY (creator) REFERENCES users(username)
);

DELIMITER //

CREATE PROCEDURE addquestion(
    IN p_creator VARCHAR(255),
    IN p_description VARCHAR(4096),
    IN p_solution VARCHAR(4096),
    IN p_subject VARCHAR(255),
    IN p_tags VARCHAR(255),
    IN p_difficulty INT
)
BEGIN
    INSERT INTO desc_problems(id, creator, description, solution, subject, tags, difficulty)
    VALUES (UUID(), p_creator, p_description, p_solution, p_subject, p_tags, p_difficulty);
END//

DELIMITER ;

CREATE TABLE IF NOT EXISTS posts(
    id VARCHAR(255) PRIMARY KEY,
    creator VARCHAR(255) NOT NULL,
    posttime DATETIME DEFAULT CURRENT_TIMESTAMP,
    description VARCHAR(4096),
    problems VARCHAR(4096) NOT NULL,
    FOREIGN KEY (creator) REFERENCES users(username)
);

DELIMITER //

CREATE PROCEDURE addpost(
    IN p_creator VARCHAR(255),
    IN p_description VARCHAR(4096),
    IN p_problems VARCHAR(4096)
)
BEGIN
    INSERT INTO posts(id, creator, description, problems)
    VALUES (UUID(), p_creator, p_description, p_problems);
END//

DELIMITER ;


CREATE TABLE IF NOT EXISTS mcq(
    id VARCHAR(255) PRIMARY KEY,
    creator VARCHAR(255),
    description VARCHAR(255),
    solution VARCHAR(255),
    subject VARCHAR(255),
    tags VARCHAR(255),
    difficulty INT,
    FOREIGN KEY (creator) REFERENCES users(username)
);