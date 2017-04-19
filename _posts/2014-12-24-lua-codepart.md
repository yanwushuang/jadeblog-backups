title: Lua代码片段收集
date: 2014-12-22 12:00
categories: Program
tags: Lua
---

### Lua实现闭包
```lua
--[[@Func :实现闭包
    @Desc : 当一个函数内部嵌套另一个函数定义时，内部的函数体可以访问外部的函数的局部变量，这种特征我们称作词法定界]]
function fuck()
    local i = 0
    return function()
        i = i + 1
        return i
    end
end
c1 = fuck()
print(c1())
print(c1())
```

<!--more-->

### 序列化Lua表
```lua
-- Desc : 序列化Lua表(Convert Lua-Table To String)
function serialize(t)
	local mark={}
	local assign={}

	local function ser_table(tbl,parent)
		mark[tbl]=parent
		local tmp={}
		for k,v in pairs(tbl) do
			local key= type(k)=="number" and "["..k.."]" or k
			if type(v)=="table" then
				local dotkey= parent..(type(k)=="number" and key or "."..key)
				if mark[v] then
					table.insert(assign,dotkey.."="..mark[v])
				else
					table.insert(tmp, key.."="..ser_table(v,dotkey))
				end
			else
				table.insert(tmp, key.."="..v)
			end
		end
		return "{"..table.concat(tmp,",").."}"
	end

	return "do local ret="..ser_table(t,"ret")..table.concat(assign," ").." return ret end"
end
```

<br>
### 实现Java字符串的Hash算法
```lua
-- 实现Java字符串的Hash算法
hash = function(input)
    input = tostring(input);
    local h = 0
    local len = string.len(input)
    local max = 2147483647
    local min = -2147483648
    local cycle = 4294967296

    for i=1, len do
        h = 31 * h + string.byte(string.sub(input, i, i));
        while h > max do
            h = h - cycle
        end
        while h < min do
            h = h + cycle
        end
    end
    return h
end
```

### 树形打印lua table表
``` lua
--Desc: 树形打印lua table表
local print = print
local tconcat = table.concat
local tinsert = table.insert
local srep = string.rep
local type = type
local pairs = pairs
local tostring = tostring
local next = next

function print_lua_table (lua_table, indent)

    if not lua_table or type(lua_table) ~= "table" then
        return;
    end

    indent = indent or 0
    for k, v in pairs(lua_table) do
        if type(k) == "string" then
            k = string.format("%q", k)
        end
        local szSuffix = ""
        if type(v) == "table" then
            szSuffix = "{"
        end
        local szPrefix = string.rep("    ", indent)
        formatting = szPrefix.."["..k.."]".." = "..szSuffix
        if type(v) == "table" then
            print(formatting)
            print_lua_table(v, indent + 1)
            print(szPrefix.."},")
        else
            local szValue = ""
            if type(v) == "string" then
                szValue = string.format("%q", v)
            else
                szValue = tostring(v)
            end
            print(formatting..szValue..",")
        end
    end
end
```
具体更加详细的内容可参见[树形打印lua table表](http://www.cnblogs.com/jadeboy/p/3972524.html)
