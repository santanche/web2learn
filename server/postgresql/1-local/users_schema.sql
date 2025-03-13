CREATE TABLE users (
  email_id VARCHAR(320),
  name  VARCHAR(100) NOT NULL,
  birthday DATE,
  PRIMARY KEY (email_id)
);

INSERT INTO users VALUES ('asdrubal@email.com', 'Asdrubal', '2024-01-20');
INSERT INTO users VALUES ('doriana@email.com', 'Doriana', '2024-03-05');
INSERT INTO users VALUES ('bonerges@email.com', 'Bonerges', '2024-05-01');