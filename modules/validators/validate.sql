CREATE DEFINER=`itdevteam`@`%` PROCEDURE `BalanceSheetTotalchidrenFirst`()
BEGIN
   DELETE FROM accounting.first_todo;
   leave_one:BEGIN
     DECLARE result int DEFAULT 0;
     DECLARE id int DEFAULT 0;
     DECLARE ex_cursor CURSOR for SELECT a.c_id FROM accounting.journal_transactions a INNER JOIN accounting.chart_of_accounts b ON b.c_id = a.c_id INNER JOIN accounting.accounts_type e ON e.uid = b.ac_type WHERE e.ac_symbol IN ('CA', 'LT', 'CL', 'NCL', 'SH');

     DECLARE CONTINUE handler for NOT found SET result =1;
     open ex_cursor;
       cursor_loop:LOOP
         fetch ex_cursor into id;
         IF result =1 THEN
            leave cursor_loop;
         END IF;
         insert into accounting.first_todo(id, balances)(WITH RECURSIVE cte(c_id, parents,bs_id) AS (SELECT c_id,parents,bs_id FROM accounting.journal_transactions WHERE c_id = id UNION SELECT t1.c_id, t1.parents, t1.bs_id FROM accounting.journal_transactions t1 INNER JOIN cte t2 ON t2.c_id = t1.parents ) SELECT u.c_id, SUM(k.amout) AS balances FROM cte u LEFT JOIN accounting.ledger_entries k ON k.ch_id = u.c_id LEFT JOIN accounting.chart_of_accounts y ON y.c_id = u.c_id);
       END LOOP cursor_loop; 
     close ex_cursor;     
   END leave_one;
   SELECT * FROM accounting.first_todo;
END