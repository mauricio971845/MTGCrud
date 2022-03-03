DECLARE @result NVARCHAR(max);
set @result = (SELECT ROW_NUMBER() OVER (ORDER BY RELEASEDDATE) AS id , SetName as setName, Code as code, SetType as setType, ReleasedDate as releasedDate, BlockName as blockName, Symbol as symbol FROM MTGSet FOR JSON AUTO)
select @result


