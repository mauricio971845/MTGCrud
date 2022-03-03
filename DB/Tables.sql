drop table if exists Format_Card;
drop table if exists Card_Type;

drop table if exists Card_Color;
drop table if exists Split_Flip_Card;
drop table if exists Ruling;
drop table if exists ColorIdentity;
drop table if exists Card_ColorIdentity;
--drop table if exists User;
drop table if exists UserDeck;
drop table if exists Deck;
drop table if exists Deck_has_Card;

drop table if exists Color;
drop table if exists Type;
drop table if exists Format;
drop table if exists Card;
drop table if exists MTGSet;

create table MTGSet (
    setName VARCHAR(150) NOT NULL, 
    PRIMARY KEY (setName), 
    Code VARCHAR(70), 
    SetType VARCHAR (70), 
    ReleasedDate DATE, 
    BlockName VARCHAR(70),
    Symbol varchar(max)
);
GO

CREATE TABLE Card
(
    CardId INT NOT NULL,        
    CardName VARCHAR(500) NOT NULL,
    MultiverseID INT,
    Layout VARCHAR (60),
    ManaCost VARCHAR (60),
    CMC FLOAT,
    CardText VARCHAR(1000),
    CardType VARCHAR (100),
    Rarity VARCHAR(50),
    FlavorText VARCHAR(1000),
    Artist VARCHAR(100),
    Power VARCHAR(30),
    Toughness VARCHAR(30),
    Loyalty INT null,
    setName VARCHAR(150),
    CONSTRAINT FK_setName FOREIGN KEY (setName)
        REFERENCES MTGSet(setName) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT PK_Card PRIMARY KEY (CardId)        
);
GO

CREATE TABLE Format
(
    FormatName VARCHAR (80) NOT NULL PRIMARY KEY
);
GO

CREATE TABLE Format_Card
(
    CardID INT,
    FormatName VARCHAR(80),
    BanType VARCHAR(80),
    CONSTRAINT FK_CardID FOREIGN KEY (CardID)
        REFERENCES Card(CardId) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_FormatName FOREIGN KEY (FormatName)
        REFERENCES Format(FormatName) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT PK_FormatCard PRIMARY KEY (FormatName,CardId)        
);
GO

CREATE TABLE Type
(
    TypeID INT identity,        
    Types VARCHAR (30),
    TypeName VARCHAR(80),
    CONSTRAINT PK_Type PRIMARY KEY (TypeID)        
);
GO

CREATE Table Card_Type
(
    CardID INT,
    TypeID INT,

    CONSTRAINT fk_CardType_CardID FOREIGN KEY (CardID)
        REFERENCES Card(CardId) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_TypeID FOREIGN KEY (TypeID)
        REFERENCES Type(TypeID) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT PK_CardType PRIMARY KEY (CardID, TypeID)
);
GO

CREATE TABLE Color
(
    ColorID INT IDENTITY,        
    ColorName VARCHAR (40),
    ColorSymbol VARCHAR (5),
    CONSTRAINT PK_Color primary key (ColorID)
);
GO

INSERT INTO Color (ColorName, ColorSymbol) VALUES ('Blue', 'U');
INSERT INTO Color (ColorName, ColorSymbol) VALUES ('Black', 'B' );
INSERT INTO Color (ColorName, ColorSymbol) VALUES ('White', 'W');
INSERT INTO Color (ColorName, ColorSymbol) VALUES ('Green', 'G' );
INSERT INTO Color (ColorName, ColorSymbol) VALUES ('Red', 'R' );

CREATE TABLE Card_Color
(
    CardID INT,
    ColorID INT NOT NULL,
    CONSTRAINT fk_CardColor_CardID FOREIGN KEY (CardID)
        REFERENCES Card(CardID) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_Color FOREIGN KEY (ColorID)
        REFERENCES Color(ColorID) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT PK_CardColor PRIMARY KEY (ColorID, CardID) 
);
GO

/*



CREATE TABLE Ruling
(
    CardID INT,
        FOREIGN KEY fk_CardID(CardID)
        REFERENCES Card(ID)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    TextRuling VARCHAR(2000),
    RulingYear DATE,
    PRIMARY KEY (CardID, TextRuling)
);

CREATE TABLE Split_Flip_Card
(
    SFPairID INT NOT NULL AUTO_INCREMENT,
    CardID INT,
    FOREIGN KEY fk_CardID(CardID)
        REFERENCES Card(ID)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    NamesOnCard VARCHAR(500),
    PRIMARY KEY (SFPairID)
);

CREATE TABLE ColorIdentity
(
    ColorID INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ColorID),
    ColorName VARCHAR (40),
    ColorSymbol VARCHAR (5)
);

INSERT INTO ColorIdentity (ColorID, ColorName, ColorSymbol) VALUES (DEFAULT,"Blue", "U");
INSERT INTO ColorIdentity (ColorID, ColorName, ColorSymbol) VALUES (DEFAULT, "Black", "B" );
INSERT INTO ColorIdentity (ColorID, ColorName, ColorSymbol) VALUES (DEFAULT, "White", "W");
INSERT INTO ColorIdentity (ColorID, ColorName, ColorSymbol) VALUES (DEFAULT, "Green", "G" );
INSERT INTO ColorIdentity (ColorID, ColorName, ColorSymbol) VALUES (DEFAULT,"Red", "R" );

CREATE TABLE Card_ColorIdentity
(
    CardID INT,
        FOREIGN KEY fk_CardID(CardID)
        REFERENCES Card(ID)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    ColorID INT NOT NULL,
        FOREIGN KEY fk_ColorID(ColorID)
        REFERENCES ColorIdentity(ColorID)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    PRIMARY KEY (ColorID, CardID)
);

CREATE TABLE User 
(
    Username VARCHAR (80) NOT NULL,
        PRIMARY KEY (Username),
    Password VARCHAR(45),
    Role VARCHAR(45)
);

CREATE TABLE Deck
(
    idDeck INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (idDeck),
    DeckName VARCHAR(45),
    Format VARCHAR(80)
);

CREATE TABLE UserDeck
(
    Username VARCHAR(80),
        FOREIGN KEY fk_Username(Username)
        REFERENCES User(Username)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    idDeck INT,
        FOREIGN KEY fk_idDeck(idDeck)
        REFERENCES Deck(idDeck)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    Visible VARCHAR(45)
);

CREATE TABLE Deck_has_Card
(
    idDeck INT,
        FOREIGN KEY fk_idDeck(idDeck)
        REFERENCES Deck(idDeck)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    Card_ID INT,
        FOREIGN KEY fk_Card_ID(Card_ID)
        REFERENCES Card(ID),
    MainboardQty INT,
    SideboardQty INT
);
*/
