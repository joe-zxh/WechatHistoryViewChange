package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"os"
	"io/ioutil"
	"bytes"
	"golang.org/x/text/encoding/simplifiedchinese"
	"golang.org/x/text/transform"
	"sort"
	"strconv"
)

const (
	DB_Driver = "root:********@tcp(127.0.0.1:3306)/wechat?charset=utf8"
)

func OpenDB() (success bool, db *sql.DB) {
	var isOpen bool
	db, err := sql.Open("mysql", DB_Driver)
	if err != nil {
		isOpen = false
	} else {
		isOpen = true
	}
	CheckErr(err)
	return isOpen, db
}


func QueryFromDB(db *sql.DB, date string, talker string) int {
	sqlStr:="SELECT COUNT(content) FROM messages where date='"+date+"' AND talker='"+talker+"'"
	row, err := db.Query(sqlStr)
	CheckErr(err)

	var num int
	for row.Next() {
		err = row.Scan(&num)
	}

	CheckErr(err)

	return num
}

type Person struct{
	Name string
	Type int // 根据这个来设置颜色的
	DiagCount int //对话次数
}

var showLine = 6 // 显示的个数
var persons =[]string{"同事1","同事2","同事3","同事4","同事5","同事6","同事7","同事8"}
var gl=len(persons)
var data = make([]Person, len(persons))

var startYear, startMonth, startDay = 2019, 1, 1 // 设置开始和结束的时间
var endYear, endMonth, endDay = 2019, 9, 16

func initialization() {
	for i:=0;i<gl;i++{
		data[i].Name = persons[i]
		data[i].Type = i % 27 // 一共27种颜色
		data[i].DiagCount = 0
	}
}

func main() {

	initialization()

	_, db := OpenDB()

	outputString := "name,type,value,date\n"

	for y:=startYear;y<=endYear;y++{
		for m:=startMonth;m<=endMonth;m++{
			var edtemp int
			if y==endYear && m == endMonth {
				edtemp = endDay
			} else {
				edtemp = getEndDay(y, m)
			}

			for d:=startDay;d<=edtemp;d++{
				date:=strconv.Itoa(y)+"-"+strconv.Itoa(m)+"-"+strconv.Itoa(d)

				for i:=0;i<gl;i++{
					num:=QueryFromDB(db,date, data[i].Name)
					data[i].DiagCount += num
				}

				sort.Slice(data, func(i, j int) bool {
					return data[i].DiagCount > data[j].DiagCount
				})

				for i:=0;i<showLine;i++{
					outputString+=data[i].Name+","+strconv.Itoa(data[i].Type)+","+strconv.Itoa(data[i].DiagCount)+","+date+"\n"
				}

			}
		}
	}

	outputdata, _ := ioutil.ReadAll(transform.NewReader(bytes.NewReader([]byte(outputString)), simplifiedchinese.GBK.NewEncoder())) // 转换成GBK格式

	filename:=fmt.Sprintf("E:\\Desktop\\viewTalkChange\\Historical-ranking-data-visualization-based-on-d3.js-master\\src\\gooutput1.csv")
	file, err:=os.OpenFile(filename,os.O_CREATE|os.O_TRUNC,0666)
	if err!=nil{
		fmt.Println(err)
	}
	defer file.Close()
	//_, err=file.WriteString(outputString)
	_, err=file.WriteString(string(outputdata))
	if err!=nil{
		fmt.Println(err)
	}
}

func CheckErr(err error) {
	if err != nil {
		fmt.Println("err:", err)
		panic(err)
	}
}

func getEndDay(year int, month int) int {
	if month==2 {
		if (year%100==0 && year%400==0) || (year%100!=0&&year%4==0) {
			return 29 // 闰年
		}else{
			return 28
		}
	}else if (month==1||month==3||month==5||month==7||month==8||month==10||month==12) {
		return 31
	}else{
		return 30
	}
}

