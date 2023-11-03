local p = nil
local inMinigame = false

function MemoryGame(keysNeeded, rounds, time)
    if keysNeeded == nil or keysNeeded < 1 then keysNeeded = 5 end
    if keysNeeded > 12 then keysNeeded = 12 end
    if rounds == nil or rounds < 1 then rounds = 1 end
    if time == nil or time < 1 then time = 10000 end
    p = promise.new()
    SendNUIMessage({
        Type = 'MemoryGame',
        keysNeeded = keysNeeded,
		rounds = rounds,
        time = time,
    })
    SetNuiFocus(true, true)
    inMinigameLoop()
    local result = Citizen.Await(p)
    return result
end

function NumberUp(keyAmount, rounds, tries, time, shuffleTime)
    if keyAmount == nil or keyAmount < 8 then keyAmount = 8 end
    if keyAmount > 40 then keyAmount = 40 end
    if rounds == nil or rounds < 1 then rounds = 1 end
    if tries == nil or tries < 1 then tries = 1 end
    if time == nil or time < 1 then time = 10000 end
    if shuffleTime == nil or shuffleTime < 1 then shuffleTime = 5000 end
    p = promise.new()
    SendNUIMessage({
        Type = 'NumberUp',
        keyAmount = keyAmount,
		rounds = rounds,
        tries = tries,
        time = time,
        shuffleTime = shuffleTime,
    })
    SetNuiFocus(true, true)
    inMinigameLoop()
    local result = Citizen.Await(p)
    return result
end

function SkillCheck(speed, time, keys, rounds, bars, safebars)
    if speed == nil or speed < 1 then speed = 50 end
    if time == nil or time < 1 then time = 5000 end
    if keys == nil then keys = {'a', 's', 'd', 'w'} end
    if type(keys) == 'string' then keys = {keys} end
    if rounds == nil or rounds < 1 then rounds = 1 end
    if bars == nil or bars < 5 then bars = 20 end
    if safebars == nil or safebars < 1 then safebars = 3 end
    p = promise.new()
    SendNUIMessage({
        Type = 'SkillCheck',
        speed = speed,
		time = time,
        keys = keys,
        rounds = rounds,
        bars = bars,
        safebars = safebars,
    })
    SetNuiFocus(true, true)
    inMinigameLoop()
    local result = Citizen.Await(p)
    return result
end

function Thermite(boxes, correctboxes, time, lifes, rounds, showTime)
    if boxes == nil or boxes < 2 then boxes = 7 end 
    if correctboxes == nil or correctboxes < 1 then correctboxes = 5 end
    if time == nil or time < 1 then time = 10000 end
    if lifes == nil or lifes < 1 then lifes = 2 end
    if rounds == nil or rounds < 1 then rounds = 2 end
    if showTime == nil or showTime < 1 then showTime = 3000 end
    p = promise.new()
    SendNUIMessage({
        Type = 'Thermite',
        boxes = boxes,
		correctboxes = correctboxes,
        time = time,
        lifes = lifes,
        rounds = rounds,
        showTime = showTime,
    })
    SetNuiFocus(true, true)
    inMinigameLoop()
    local result = Citizen.Await(p)
    return result
end
function SkillBar(duration, width, rounds)
    if duration == nil or duration < 1 then duration = 3000 end
    if width == nil or width < 1 then width = 10 end
    if rounds == nil or rounds < 1 then rounds = 2 end
    p = promise.new()
    SendNUIMessage({
        Type = 'SkillBar',
        duration = duration,
		width = width,
        rounds = rounds,
    })
    SetNuiFocus(true, true)
    inMinigameLoop()
    local result = Citizen.Await(p)
    return result
end

function inMinigameLoop()
    if inMinigame then return end
    inMinigame = true
    CreateThread(function()
		repeat
			SetPauseMenuActive(false)
			DisableControlAction(0, 1, true) 
			DisableControlAction(0, 2, true)
			Wait(0)
		until inMinigame == false  
	end)
end


RegisterNUICallback('Fail', function(data)
    if p then 
        inMinigame = false
        SetNuiFocus(false, false)
        p:resolve(false)
    end
end)

RegisterNUICallback('Success', function(data)
    if p then
        inMinigame = false
        SetNuiFocus(false, false)
        p:resolve(true)
    end
end)

exports("MemoryGame", MemoryGame)
exports("NumberUp", NumberUp)
exports("SkillCheck", SkillCheck)
exports("Thermite", Thermite)
exports("SkillBar", SkillBar)

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
                                        --SkillBar(duration aka speed(milliseconds), width%(number), rounds(number))
    local success = exports['SN-Hacking']:SkillBar(3000, 10, 2)
    if success then
        print("success")
    else
        print("fail")
    end
end)