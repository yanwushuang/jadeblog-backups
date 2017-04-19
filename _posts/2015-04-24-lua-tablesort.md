title: lua表排序
date: 2015-04-24 20:20
categories: Program
tags: Lua
description:
---

Lua作为一种很强大且轻量级脚本语言的存在，对于掌握其几乎无所不能的Table(其实就是一个Key Value的数据结构，它很像Javascript中的Object，或是PHP中的数组，在别的语言里叫Dict或Map)是十分必要的。对于Lua语言可参见酷壳[Lua简明教程](http://coolshell.cn/articles/10739.html)这篇Blog。

<!-- more -->

对于lua的table排序问题，一般的使用大多是按照value值来排序，使用table.sort( needSortTable , func)即可（可以根据自己的需要重写func，否则会根据默认来：默认的情形之下，如果表内既有string，number类型，则会因为两个类型直接compare而出错，所以需要自己写func来转换一下；也可根据自己的需要在此func中 添加相应的逻辑来达到你的 排序要求）；
``` lua
local test_table = {2,1,3,"SORT","sort"}  
table.sort(test_table , function(a , b)
        return tostring(a) > tostring(b)
    end)  
for key,value in pairs(test_table) do  
    print(key,value)  
end  
```
-- 输出如下：
>1    sort
2    SORT
3    3
4    2
5    1

若要进行对表进行按照 键值对key值来进行排序，只是输入的话，目测可以这样：
``` lua
local test_table = {a=3,b=2,c=4,d=1}  
local key_table = {}  
--取出所有的键  
for key,_ in pairs(test_table) do  
    table.insert(key_table,key)  
end  
--对所有键进行排序  
table.sort(key_table)  
for _,key in pairs(key_table) do  
    print(key,test_table[key])  
end
```
但是这样子仅仅能够使得print输入时达到这个目的，而table本身并没有因此而改变，所以这样是不可取的； 我们可以改变泛型for的迭代因子来达到这个目的的：
``` lua
function ipairs2(a)
    return iter,a,0
end

local function iter(a, i)
    i = i + 1
    local v = a[i]
    if v then
        return i, v
    else
        return nil, nil
    end
end

a = {"one","two","three"}
for k,v in ipairs2(a) do
    print(k, v)
end
```
--输出结果为：
>1       one
2       two
3       three

如此是达到我们的目的了，但是这个只能支持下表为整形的table（即是放在table数组部分的表，hash部分却无能为力）；所以需要类似这样子：
``` lua
lines = {
    name = "jeff",
    {"pairsByKeys"},
    luaH_set = 10,
    luaH_get = 24,
    luaH_present = 48,
}

function pairsByKeys(t, f)
    local a = {}
    for n in pairs(t) do table.insert(a, n) end
    table.sort(a, f)
    local i = 0                 -- iterator variable
    local iter = function ()    -- iterator function
       i = i + 1
       if a[i] == nil then return nil
       else return a[i], t[a[i]]
       end
    end
    return iter
end

function sortFunc(a , b)
    if tostring(a) > tostring(b) then 
        return true
    end
end

for name, line in pairsByKeys(lines , sortFunc) do
    print(name, line)
end
```
输出地结果如下：
>name    jeff
luaH_set    10
luaH_present    48
luaH_get    24
1    table: 027EE6E8
[Finished in 0.1s]

如此这般 即可实现表按照键值对的排序了；这样的实现方式其实与上述将table的索引存入一个temp表中，并将此temp表按func排序；只不过这里 使用闭包，将此处理放置在了一个方法内来替代pairs罢了；