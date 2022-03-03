/*
			     SELECT TOP 1000 
				    CardId as cardId,
            CardName as cardName,
            MultiverseID as multiverseId,
            Layout as layout,
            ManaCost as manaCost,
            CMC,
            CardText as cardText,
            CardType as cardType,
            Rarity as rarity,
            FlavorText as flavorText,
            Artist as artist,
            Power as power,
            Toughness as toughness,
            Loyalty as loyalty,
            card.SetName as setName
            , MTGSet.symbol
				   FROM Card inner join MTGSet on card.SetName = MTGSet.SetName where MTGSet.symbol is not null  */

DECLARE @result NVARCHAR(max);
set @result = 
             (
			     SELECT 
				    CardId as cardId,
            CardName as cardName,
            MultiverseID as multiverseId,
            Layout as layout,
            ManaCost as manaCost,
            CMC,
            CardText as cardText,
            CardType as cardType,
            Rarity as rarity,
            FlavorText as flavorText,
            Artist as artist,
            Power as power,
            Toughness as toughness,
            Loyalty as loyalty,
            card.SetName as setName            
				   FROM Card WHERE CardId>=1 AND CardId<=5000 FOR JSON AUTO)
select @result


select * from openjson(@result) 
