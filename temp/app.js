'use strict';

const xlsx = require('node-xlsx');
const fs = require('fs');

const baseJson = `${__dirname}/base.json`;
const inputFile = `${__dirname}/input.xlsx`;
const outputFile = `${__dirname}/output.xlsx`;


const skipLine = 0;        // 不处理第0行数据
const idColumn = 0;        // id所在列
const operateColumn = 11;  // 操作所在列
const ADD = 'ADD';         // ADD操作字符
const MOD = 'MOD';         // MOD操作字符
const DEL = 'DEL';         // DEL操作字符

let inputSheet;
let jsonData;
let currentId = 1;

try{
    inputSheet = xlsx.parse(inputFile);
}catch(e){
    log('解析输入文件异常，查看文件是否存在');
    return;
}

if(inputSheet.length === 0 || inputSheet[0].data.length === 0){
    log('无效的文件:', inputFile);
    return;
}

try{
    jsonData = require(baseJson);
}catch(e){
    log('json文件不存在或解析异常，原始数据为空');
}


let inputData = inputSheet[0].data;
// 去掉第0行数据
let title = inputData.shift();
// 如果json数据不存在，直接使用输入的文件数据
if(!jsonData){
    currentId = 1;
    jsonData = {};
    jsonData.title = title;
    jsonData.data = {};
    for(var data of inputData){
        if(data[operateColumn] && data[operateColumn].toUpperCase() == ADD){
            data[0] = currentId;
            jsonData.data[currentId] = data;
            currentId++;
        }else{
            log('未找到对应数据', data[0]);
        }
    }
}else{
    jsonData.title = title;
    if(!jsonData.data){
        jsonData.data = {};
        currentId = 1;
    }else{
        let ids = [];
        for(let i in jsonData.data){
            ids.push(i);
        }
        currentId = Math.max.apply(Math, ids);
    }
    log('currentId:',currentId);

    for(let data of inputData){

        if(!data[operateColumn]){
            log('未找到操作指示');
            return;
        }
        switch(data[operateColumn].toUpperCase()){
            case ADD:
            data[0] = currentId;
            jsonData.data[currentId] = data;
            currentId++;
            break;
            case MOD:
            if(!data[0]){
                log('未找的id');
                return;
            }
            if(!jsonData.data[data[0]]){
                log('未找到记录数据', data[0]);
                return;
            }
            jsonData.data[data[0]] = data;
            break;
            case DEL:
            if(!data[0]){
                log('未找的id');
                return;
            }
            if(!jsonData.data[data[0]]){
                log('未找到记录数据', data[0]);
                return;
            }
            delete jsonData.data[data[0]];
            break;
            default:
            log('未识别的命令', data[operateColumn]);
            return;
        }
    }
}

saveBaseJson(JSON.stringify(jsonData));

let myData = [];
for(let i in jsonData.data){
    myData.push(jsonData.data[i]);
}
myData.unshift(jsonData.title);

let mySheet = [{name: "mySheet", data: myData}];
buildOutputFile(mySheet);




// 日志记录
function log(){
    console.log.apply(console, arguments);
}

// 创建outputFile
function buildOutputFile(sheet){
    var buffer = xlsx.build(sheet); // Returns a buffer
    fs.writeFile(outputFile, buffer, (err) => {
        if(err){
            log('错误：', err);
            return;
        }
        log('output.xlsx文件输出成功');
    });
}

// 保存json数据
function saveBaseJson(json){
    fs.writeFile(baseJson, json, (err) => {
        if(err){
            log('错误:', err);
            return;
        }
        log('基本信息已保存到', baseJson);
    })
}