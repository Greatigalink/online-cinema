from flask import Flask,url_for,request,render_template,Response
from flask import jsonify,json
from flask_cors import *
import sys
import sqlite3
import os
import time

app = Flask(__name__)
CORS(app, supports_credentials=True)    #跨域
#设置编码格式
reload(sys)
sys.setdefaultencoding('utf8')
os.environ['NLS_LANG'] = 'Simplified Chinese_CHINA.ZHS16GBK'

# def toStr(data):
#     return '\'{0}\''.format(data)

def strSend(data):  #格式化发送消息
    print time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())),'send:====================================================>>\ntype:',type(data),'\ndata:',json.dumps(data).decode('unicode-escape'),'\n\
==============================================================================='
def strRecv(data):  #格式化接受消息
    print time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())),'recv:<<====================================================\ntype:',type(data),'\ndata:',json.dumps(data).decode('unicode-escape'),'\n\
==============================================================================='
def ret(data):      #格式化返回
    strSend(data)
    #app.logger.info(data)
    return jsonify(data)

def selectData(table,recv):     #查询表
    if recv == None:
        return ret(None)
    sql = 'select * from %s'%table
    isFirst = 1
    for (k,v) in recv.items():
        if v != None:
            if isFirst == 0:
                sql += ' and '
            elif isFirst == 1:
                sql += ' where '
        isFirst = 0
        sql += "%s like '%s'"%(k,v)
    print sql
    conn = sqlite3.connect('./database/all.db')
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    rows = cur.execute(sql).fetchall()
    rows = [dict(row) for row in rows]
    if len(rows) == 0:
        return None
    else:
        return rows

def insertData(table,recv):     #插入表
    if recv == None:
        return None
    sql = 'insert into %s '%table
    sql1 = '('
    sql2 = '('
    isFirst = 1
    for (k,v) in recv.items():
        if v != None:
            sql1 += "%s,"%k
            sql2 += "'%s',"%v
    sql1 = (sql1[:-1]+') ')
    sql2 = (sql2[:-1]+')')
    sql = sql + sql1 + 'values ' + sql2
    print sql
    conn = sqlite3.connect('./database/all.db')
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    try:                    #插入成功
        cur.execute(sql)
        conn.commit()
        return 1
    except Exception as e:  #插入失败
        return 0

def selectMovie(movieDict):     #查询分类的20个电影
    conn = sqlite3.connect('./database/all.db')  #连接数据库
    movieinfo = ['name','time','length','director','starring','type','area','sorce','poster']   #传参对应的类型
    tag = movieDict['tag']
    counts = movieDict['counts']
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    
    sql = "select * from movie"
    isFirst = 1    #判断是否是第一次
    for i in range(9):
        if tag[i] != None:
            if isFirst == 0:
                sql += ' and '
            elif isFirst == 1:
	        sql += ' where '
		isFirst = 0
	    sql += (movieinfo[i]+' like "%s"'%tag[i])
    sql += ' limit '+str(counts)
    print sql
    rows = cur.execute(sql).fetchall()
    rows = [dict(row) for row in rows]
    return rows

@app.route('/comment',methods = ['POST'])
def comment():          #查找评论
    recv = request.get_json()   #movie_id
    strRecv(recv)
    result = []
    lou = selectData('comment',recv)
    if lou == None:
        return ret(None)
    for i in range(len(lou)):
        temp = {
            'main_id':lou[i]['id']
        }
        ceng = selectData('comment',temp)
        temp2 = {}
        temp2['comment'] = lou[i]
        temp2['replay'] = ceng
        result.append(temp2)
    return ret(result)
    
@app.route('/commit',methods = ['POST'])
def commit():           #提交评论
    recv = request.get_json()
    strRecv(recv)
    result = insertData('comment',recv)
    return ret(result)

@app.route('/refund',methods = ['POST'])
def refund():           #退票
    recv = request.get_json()
    strRecv(recv)
    sql = 'update %s set state = 0 where order_id = %s'%('order_c',recv['order_id'])
    print sql
    conn = sqlite3.connect('./database/all.db')
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    try:                    #退票成功
        cur.execute(sql)
        conn.commit()
        return ret(1)
    except Exception as e:  #退票失败
        return ret(0)

@app.route('/movieInfo',methods = ['POST'])
def movieInfo():        #下单页面信息
    recv = request.get_json()
    strRecv(recv)
    result = selectData('movie_info',recv)
    return ret(result)

@app.route('/register',methods = ['POST'])
def register():         #注册
    recv = request.get_json()
    strRecv(recv)
    if recv == None:
        return ret(None)
    nickname = recv['nickname']
    email = recv['email']
    tel_number = recv['tel_number']
    keyword = recv['keyword']
    if len(nickname) == 0:
        return ret('0')
    if len(keyword) == 0:
        return ret('0')
    sql = 'insert into customer values(NULL,"%s",NULL,"%s","%s","%s")'%(nickname,email,tel_number,keyword)
    print sql
    conn = sqlite3.connect('./database/all.db')
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    try:
        cur.execute(sql)
        conn.commit()
    except Exception as e:
        #print 'error:',e
        return ret(0)   #用户已存在
    sql = "select * from customer where nickname = '%s'"%nickname
    print sql
    rows = cur.execute(sql).fetchall()  #查询
    rows = [dict(row) for row in rows]
    return rows[0]  #返回用户信息

@app.route('/customer',methods = ['POST'])
def customer():         #登录
    recv = request.get_json()
    strRecv(recv)
    if recv == None:
        strRecv(None)
        return ret(None)
    conn = sqlite3.connect('./database/all.db')  #连接数据库
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    nickname = recv['nickname']
    keyword = recv['keyword']
    sql = "select * from customer where nickname like '%s'"%nickname
    print sql
    rows = cur.execute(sql).fetchall()
    rows = [dict(row) for row in rows]
    if len(rows) == 0:      #用户不存在
        return ret(2)
    #print rows[0]
    if rows[0]['keyword'] == keyword:   #密码正确
        return rows[0]
    else:
        return ret(0)       #密码错误

@app.route('/buy',methods = ['POST'])
def buy():              #购买
    recv = request.get_json()
    strRecv(recv)
    result = insertData('order_c',recv)
    if result == 0:
        return ret(-1)
    movie_id = {
        'movie_id':recv['movie_id']
    }
    result = selectData('movie_info',movie_id)
    remain = {}
    remain['remain'] = result[0]['remain']
    remain['bought'] = result[0]['bought']
    remain['hall_id'] = result[0]['hall_id']
    return ret(remain)    

@app.route('/order',methods = ['POST'])
def order():            #查订单信息
    recv = request.get_json()
    strRecv(recv)
    result = selectData('order_c',recv)
    return ret(result)

@app.route('/movieList',methods = ['POST'])
def movie():            #查20个电影
    recv = request.get_json()
    strRecv(recv)
    rows = selectMovie(recv)
    return jsonify(rows)
'''
def xxx
    from flask import request
    def get():
        dict = request.args['name']
        print(dict)
    def formdata():
        dict = request.form['name']
        print(dict)
    def file():
        dict = request.files['file']
        print(dict)
    def json():
        dict = request.get_json()
        print(dict)	
'''
if __name__ == "__main__":
    app.run(host = '0.0.0.0',port = 5000,debug = True)