local p = nil
local inMinigame = false

function MemoryGame(keysNeeded, rounds, time)
    if keysNeeded == nil or keysNeeded < 1 then keysNeeded = 5 end
    if keysNeeded > 12 then keysNeeded = 12 end
    if rounds == nil or rounds < 1 then rounds = 1 end
    if time == nil or time < 1 then time = 10 end
    p = promise.new()
    SendNUIMessage({
        Type = 'MemoryGame',
        keysNeeded = keysNeeded,
		rounds = rounds,
        time = time * 1000,
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
    if time == nil or time < 1 then time = 10 end
    if shuffleTime == nil or shuffleTime < 1 then shuffleTime = 5 end
    p = promise.new()
    SendNUIMessage({
        Type = 'NumberUp',
        keyAmount = keyAmount,
		rounds = rounds,
        tries = tries,
        time = time * 1000,
        shuffleTime = shuffleTime * 1000,
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


RegisterCommand('MemoryGame', function()
    --MemoryGame(keysNeeded, rounds, time)
    local success = exports['SN-Hacking']:MemoryGame(3, 2, 10)
    if success then
        print("success")
    else
        print("fail")
    end
end)

RegisterCommand('NumberUp', function()
    --NumberUp(keys, rounds, tries, time, shuffleTime)
    local success = exports['SN-Hacking']:NumberUp(28, 2, 2, 40, 20)
    if success then
        print("success")
    else
        print("fail")
    end
end)

RegisterCommand('SkillCheck', function()
    --SkillCheck(speed(ms), time(ms), keys(string or table), rounds(number), bars(number), safebars(number))
    local success = exports['SN-Hacking']:SkillCheck(50, 5000, {'w','a','s','w'}, 2, 20, 3)
    if success then
        print("success")
    else
        print("fail")
    end
end)