--페이지 번호 밀기 , 만들려는 페이지의 번호 구해서 전달해서 그거랑 같은거 있으면 거기부터 뒤에거 다 하나씩 +1

--SELECT * FROM pages WHERE notecode='202302011045071009';
--SELECT * FROM pages WHERE notecode='202302011045071009' AND PAGEINDEX =2;
UPDATE pages SET PAGEINDEX =PAGEINDEX +1 WHERE notecode='202302011045071009' AND PAGEINDEX >=3;

DELETE FROM notes WHERE NOTECODE = '202302011045071009';

--삭제시뮬 202302012326351029번 노트의 3페이지 삭제
DELETE FROM pages WHERE PAGECODE ='202302012326411036';
UPDATE pages SET PAGEINDEX = PAGEINDEX -1 WHERE NOTECODE = '202302012326351029' AND PAGEINDEX > 3
--삭제시뮬 끝

SELECT * FROM pages WHERE notecode='202302012326351029';
SELECT * FROM notes;

DELETE FROM notes;


SELECT PAGECODE, max(pageIndex) totalPageCount FROM pages p,
(SELECT * FROM notes WHERE email = 'jeju@email.com') subnote
WHERE subnote.notecode = p.NOTECODE GROUP BY PAGECODE ;

SELECT NOTECODE , max(pageIndex) totalPageCount FROM pages p GROUP BY NOTECODE ORDER BY NOTECODE ;

SELECT n.* , totalPageCount FROM notes n,
(SELECT NOTECODE, max(pageIndex) totalPageCount FROM pages p GROUP BY NOTECODE) lp
WHERE n.EMAIL ='jeju@email.com' AND 
n.NOTECODE = lp.notecode
ORDER BY n.NOTECODE ;
;