local inMinigame = false
local result = nil

function MemoryGame(keysNeeded, rounds, time)
    if keysNeeded == nil or keysNeeded < 1 then keysNeeded = 5 end
    if keysNeeded > 12 then keysNeeded = 12 end
    if rounds == nil or rounds < 1 then rounds = 1 end
    if time == nil or time < 1 then time = 10000 end
    return StartMinigame({
        Type = 'MemoryGame',
        keysNeeded = keysNeeded,
		rounds = rounds,
        time = time,
    })
end

function NumberUp(keyAmount, rounds, tries, time, shuffleTime)
    if keyAmount == nil or keyAmount < 8 then keyAmount = 8 end
    if keyAmount > 40 then keyAmount = 40 end
    if rounds == nil or rounds < 1 then rounds = 1 end
    if tries == nil or tries < 1 then tries = 1 end
    if time == nil or time < 1 then time = 10000 end
    if shuffleTime == nil or shuffleTime < 1 then shuffleTime = 5000 end
    return StartMinigame({
        Type = 'NumberUp',
        keyAmount = keyAmount,
		rounds = rounds,
        tries = tries,
        time = time,
        shuffleTime = shuffleTime,
    })
end

function SkillCheck(speed, time, keys, rounds, bars, safebars)
    if speed == nil or speed < 1 then speed = 50 end
    if time == nil or time < 1 then time = 5000 end
    if keys == nil then keys = {'a', 's', 'd', 'w'} end
    if type(keys) == 'string' then keys = {keys} end
    if rounds == nil or rounds < 1 then rounds = 1 end
    if bars == nil or bars < 5 then bars = 20 end
    if safebars == nil or safebars < 1 then safebars = 3 end
    return StartMinigame({
        Type = 'SkillCheck',
        speed = speed,
		time = time,
        keys = keys,
        rounds = rounds,
        bars = bars,
        safebars = safebars,
    })
end

function Thermite(boxes, correctboxes, time, lifes, rounds, showTime)
    if boxes == nil or boxes < 2 then boxes = 7 end 
    if correctboxes == nil or correctboxes < 1 then correctboxes = 5 end
    if time == nil or time < 1 then time = 10000 end
    if lifes == nil or lifes < 1 then lifes = 2 end
    if rounds == nil or rounds < 1 then rounds = 2 end
    if showTime == nil or showTime < 1 then showTime = 3000 end
    return StartMinigame({
        Type = 'Thermite',
        boxes = boxes,
		correctboxes = correctboxes,
        time = time,
        lifes = lifes,
        rounds = rounds,
        showTime = showTime,
    })
end

function SkillBar(time, width, rounds)
    if time == nil or (type(time) ~= 'table' and  time < 1) then time = 3000 end
    if width == nil or width < 1 then width = 10 end
    if rounds == nil or rounds < 1 then rounds = 2 end
    return StartMinigame({
        Type = 'SkillBar',
        time = time,
		width = width,
        rounds = rounds,
    })
end

function ShowNumber(code, time)
    if code == nil then return false end
    if time == nil or time < 1 then time = 3000 end
    return StartMinigame({
        Type = 'KeypadShowNumber',
        code = code,
		time = time,
    })
end

function KeyPad(code, time)
    if code == nil then return false end
    if time == nil or time < 1 then time = 3000 end
    return StartMinigame({
        Type = 'KeypadType',
        code = code,
		time = time,
    })
end

function ColorPicker(icons, typeTime, viewTime)
    if icons == nil or icons < 1 then icons = 3 end
    if typeTime == nil or typeTime < 1 then typeTime = 7000 end
    if viewTime == nil or viewTime < 1 then viewTime = 3000 end
    if rounds == nil or rounds < 1 then rounds = 2 end
    return StartMinigame({
        Type = 'ColorPicker',
        icons = icons,
		typeTime = typeTime,
        viewTime = viewTime,
        rounds = rounds,
    })
end
function MemoryCards(difficulty, time, rounds)
    if difficulty == nil then difficulty = 'medium' end
    if rounds == nil or rounds < 1 then rounds = 1 end
    return StartMinigame({
        Type = 'MemoryCards',
		difficulty = difficulty,
        rounds = rounds,
    })
end

function StartMinigame(data)
    inMinigame = true
    result = nil    
    SendNUIMessage(data)
    repeat
        SetNuiFocus(true, true)
        SetPauseMenuActive(false)
        DisableControlAction(0, 1, true) 
        DisableControlAction(0, 2, true)
        Wait(0)
    until not inMinigame
    return result
end

RegisterNUICallback('Fail', function(data)
    SetNuiFocus(false, false)
    result = false
    inMinigame = false
end)

RegisterNUICallback('Success', function(data)
    SetNuiFocus(false, false)
    result = true
    inMinigame = false
end)

exports('MemoryGame', MemoryGame)
exports('NumberUp', NumberUp)
exports('SkillCheck', SkillCheck)
exports('Thermite', Thermite)
exports('SkillBar', SkillBar)
exports('ShowNumber', ShowNumber)
exports('KeyPad', KeyPad)
exports('ColorPicker', ColorPicker)
exports('MemoryCards', MemoryCards)

RegisterCommand('MemoryGame', function()
                                        --MemoryGame(keysNeeded, rounds, time(mmillisecondss))
    local success = exports['SN-Hacking']:MemoryGame(3, 2, 10000)
    if success then
        print("success")
    else
        print("fail")
    end
end)

RegisterCommand('NumberUp', function()
                                        --NumberUp(keys, rounds, tries, time(milliseconds), shuffleTime(milliseconds))
    local success = exports['SN-Hacking']:NumberUp(28, 2, 2, 40000, 20000)
    if success then
        print("success")
    else
        print("fail")
    end
end)

RegisterCommand('SkillCheck', function()
                                        --SkillCheck(speed(milliseconds), time(milliseconds), keys(string or table), rounds(number), bars(number), safebars(number))
    local success = exports['SN-Hacking']:SkillCheck(50, 5000, {'w','a','s','w'}, 2, 20, 3)
    if success then
        print("success")
    else
        print("fail")
    end
end)

RegisterCommand('Thermite', function()
                                        --Thermite(boxes(number), correctboxes(number), time(milliseconds), lifes(number), rounds(number), showTime(milliseconds))
    local success = exports['SN-Hacking']:Thermite(7, 5, 10000, 2, 2, 3000)
    if success then
        print("success")
    else
        print("fail")
    end
end)

RegisterCommand('SkillBar', function()
                                        --SkillBar(time(milliseconds or table{min(milliseconds), max(milliseconds)}), width%(number), rounds(number))
    local success = exports['SN-Hacking']:SkillBar({2000, 3000}, 10, 2)
    if success then
        print("success")
    else
        print("fail")
    end
end)


RegisterCommand('ShowNumber', function()
                        --ShowNumber(code(number), time(milliseconds))
    exports['SN-Hacking']:ShowNumber(999, 3000)
end)

RegisterCommand('KeyPad', function()
                                        --KeyPad(code(number), time(milliseconds))
    local success = exports['SN-Hacking']:KeyPad(999, 3000)
    if success then
        print("success")
    else
        print("fail")
    end
end)

RegisterCommand('ColorPicker', function()
                                    --ColorPicker(icons(number), typeTime(milliseconds), viewTime(milliseconds))
local success = exports['SN-Hacking']:ColorPicker(3, 7000, 3000)
    if success then
        print("success")
    else
        print("fail")
    end
end)

RegisterCommand('MemoryCards', function()
                                    --MemoryCards(difficulty(easy, medium, hard), rounds(number))
local success = exports['SN-Hacking']:MemoryCards('medium')
    if success then
        print("success")
    else
        print("fail")
    end
end)