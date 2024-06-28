CREATE TABLE IF NOT EXISTS cryptocurrency (
    id SERIAL PRIMARY KEY,
    namecrypto VARCHAR(50) NOT NULL UNIQUE,
    balance FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS exchangeRate (
    id SERIAL PRIMARY KEY,
    cryptoFrom VARCHAR(50) NOT NULL,
    cryptoTo VARCHAR(50) NOT NULL,
    rate FLOAT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cryptoFrom) REFERENCES cryptocurrency (namecrypto),
    FOREIGN KEY (cryptoTo) REFERENCES cryptocurrency (namecrypto)
);

CREATE TABLE IF NOT EXISTS username (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Wallet (
    username VARCHAR(50) NOT NULL,
    namecrypto VARCHAR(50) NOT NULL,
    amount FLOAT NOT NULL,
    PRIMARY KEY (username, namecrypto),
    FOREIGN KEY (username) REFERENCES username (username),
    FOREIGN KEY (namecrypto) REFERENCES cryptocurrency (namecrypto)
);

INSERT INTO
    cryptocurrency (namecrypto, balance)
VALUES ('Bitcoin', 1000.0);

INSERT INTO
    cryptocurrency (namecrypto, balance)
VALUES ('Ethereum', 1000.0);

INSERT INTO
    exchangeRate (cryptoFrom, cryptoTo, rate)
VALUES ('Bitcoin', 'Ethereum', 0.025);

INSERT INTO username (username) VALUES ('A');

INSERT INTO username (username) VALUES ('B');

INSERT INTO
    Wallet (username, namecrypto, amount)
VALUES ('A', 'Bitcoin', 2.0);

INSERT INTO
    Wallet (username, namecrypto, amount)
VALUES ('A', 'Ethereum', 2.0);

INSERT INTO
    Wallet (username, namecrypto, amount)
VALUES ('B', 'Bitcoin', 4.0);