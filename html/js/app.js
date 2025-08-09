var IphoneRing = document.createElement('audio')
IphoneRing.setAttribute('src', 'https://leon1337.host/phone/ring.mp3')
IphoneRing.setAttribute('volume', '0.05')
IphoneRing.volume = 0.05

var notificationSound = document.createElement('audio')
notificationSound.setAttribute('src', 'https://leon1337.host/phone/notification.mp3')
notificationSound.setAttribute('volume', '0.05')
notificationSound.volume = 0.05

function startTime() {
    const today = new Date()
    let hours = today.getHours()
    let minutes = today.getMinutes()

    if (hours < 10) {
        hours = '0' + hours
    }

    if (minutes < 10) {
        minutes = '0' + minutes
    }

    $("#T-Time-Text").text(hours + ':' + minutes)
    setTimeout(startTime, 5000)
}

startTime()

$(function() {
    if (isDarkThemeOn) {
        Set_Dark_Theme()
    } else {
        Set_Light_Theme()
    }

    window.addEventListener("message", function (event) {
        if (event.data.action == 'updateshit') {
            myRpName = event.data.rpName
            myNumber = event.data.number

            $.post('https://cc_phone/getBackground', JSON.stringify({
            })).done((background) => {
                if (background != undefined) {
                    $(".User-Background").attr('src', background)
                }
            })

            $.post('https://cc_phone/getVolume', JSON.stringify({
            })).done((volume) => {
                if (volume != undefined) {
                    IphoneRing.volume = volume / 100
                    notificationSound.volume = volume / 100
                    Volume_Status = volume
                }
            })
        } else if (event.data.action === "open") {
            openPhone()

            businessCount = 0

            if (event.data.haveAccess) {
                $('#M-App-2').show()
                businessCount += 1
                $("#Business-Title").text(event.data.haveAccessName)
            } else {
                $("#M-App-2").hide()
            }

            if (event.data.haveAccess3) {
                $('#M-App-3').show()
                $("#Business-3-Title").text(event.data.haveAccess3Name)
                businessCount += 1
            } else {
                $("#M-App-3").hide()
            }

            switch (businessCount) {
                case 0:
                    $("#Dispatch").css('--Col', 'var(--App-Col-2)')
                    $("#Dispatch").css('--Row', 'var(--App-Row-1)')

                    $("#FlappyBird").css('--Col', 'var(--App-Col-3)')
                    $("#FlappyBird").css('--Row', 'var(--App-Row-1)')

                    $("#Camera").css('--Col', 'var(--App-Col-4)')
                    $("#Camera").css('--Row', 'var(--App-Row-1)')

                    $("#Photos").css('--Col', 'var(--App-Col-5)')
                    $("#Photos").css('--Row', 'var(--App-Row-1)')

                    $("#Notes").css('--Col', 'var(--App-Col-1)')
                    $("#Notes").css('--Row', 'var(--App-Row-2)')

                    $("#Calculator").css('--Col', 'var(--App-Col-2)')
                    $("#Calculator").css('--Row', 'var(--App-Row-2)')

                    $("#Whatsapp").css('--Col', 'var(--App-Col-3)')
                    $("#Whatsapp").css('--Row', 'var(--App-Row-2)')

                    $("#Snake").css('--Col', 'var(--App-Col-4)')
                    $("#Snake").css('--Row', 'var(--App-Row-2)')

                    $("#Garage").css('--Col', 'var(--App-Col-5)')
                    $("#Garage").css('--Row', 'var(--App-Row-2)')
                break
                case 1:
                    $("#Dispatch").css('--Col', 'var(--App-Col-3)')
                    $("#Dispatch").css('--Row', 'var(--App-Row-1)')

                    $("#FlappyBird").css('--Col', 'var(--App-Col-4)')
                    $("#FlappyBird").css('--Row', 'var(--App-Row-1)')

                    $("#Camera").css('--Col', 'var(--App-Col-5)')
                    $("#Camera").css('--Row', 'var(--App-Row-1)')

                    $("#Photos").css('--Col', 'var(--App-Col-1)')
                    $("#Photos").css('--Row', 'var(--App-Row-2)')

                    $("#Notes").css('--Col', 'var(--App-Col-2)')
                    $("#Notes").css('--Row', 'var(--App-Row-2)')

                    $("#Calculator").css('--Col', 'var(--App-Col-3)')
                    $("#Calculator").css('--Row', 'var(--App-Row-2)')

                    $("#Whatsapp").css('--Col', 'var(--App-Col-4)')
                    $("#Whatsapp").css('--Row', 'var(--App-Row-2)')

                    $("#Snake").css('--Col', 'var(--App-Col-5)')
                    $("#Snake").css('--Row', 'var(--App-Row-2)')

                    $("#Garage").css('--Col', 'var(--App-Col-1)')
                    $("#Garage").css('--Row', 'var(--App-Row-3)')
                break
                case 2:
                    $("#Dispatch").css('--Col', 'var(--App-Col-4)')
                    $("#Dispatch").css('--Row', 'var(--App-Row-1)')

                    $("#FlappyBird").css('--Col', 'var(--App-Col-5)')
                    $("#FlappyBird").css('--Row', 'var(--App-Row-1)')

                    $("#Camera").css('--Col', 'var(--App-Col-1)')
                    $("#Camera").css('--Row', 'var(--App-Row-2)')

                    $("#Photos").css('--Col', 'var(--App-Col-2)')
                    $("#Photos").css('--Row', 'var(--App-Row-2)')

                    $("#Notes").css('--Col', 'var(--App-Col-3)')
                    $("#Notes").css('--Row', 'var(--App-Row-2)')

                    $("#Calculator").css('--Col', 'var(--App-Col-4)')
                    $("#Calculator").css('--Row', 'var(--App-Row-2)')

                    $("#Whatsapp").css('--Col', 'var(--App-Col-5)')
                    $("#Whatsapp").css('--Row', 'var(--App-Row-2)')

                    $("#Snake").css('--Col', 'var(--App-Col-1)')
                    $("#Snake").css('--Row', 'var(--App-Row-3)')

                    $("#Garage").css('--Col', 'var(--App-Col-2)')
                    $("#Garage").css('--Row', 'var(--App-Row-3)')
                break
            }
        } else if (event.data.action === "close") {
            focusPhone(false)
            closePhone()
        } else if (event.data.action === "requestCall") {
            if (isPhoneOpen) {
                New_Incoming_Call(event.data.number, event.data.name)
            } else {
                getNotifyopenPhone()
                New_Incoming_Call(event.data.number, event.data.name)
            }

            callFrequenz = event.data.callFrequenz
        } else if (event.data.action == 'answerCall') {
            clearInterval(Call_Timer)

            counter = 0

            Call_Timer = setInterval(function() {
                ++counter
                $("#Call-Timer").text(secondsToTime(counter))
            }, 1000)

            callFrequenz = callFrequenz
        } else if (event.data.action === "declineCall") {
            $("#Call").removeClass().addClass("Call-Hide-Call")
            $("#Call-PopUp").removeClass().addClass("Hide-Call-PopUp")

            IphoneRing.pause()
            IphoneRing.currentTime = 0
            callFrequenz = null

            clearInterval(Call_Timer)

            setTimeout(function() {
                $("#Call-Timer").text("0:00")
            }, 400)

            if (Call_Before_Section == "Menu") {
            } else if (Call_Before_Section == "Phone") {
                $("#Phone").removeClass().addClass("Call-Show-Phone")
            } else if (Call_Before_Section == "Contacts") {
                $("#Contacts").removeClass().addClass("Call-Show-Contacts")
            } else if (Call_Before_Section == "Business") {
                $("#Business").removeClass().addClass("Call-Show-Business")
            }

            setTimeout(function() {
                $("#Call-Back-Transition").css("display", "none")
            }, 300)
        } else if (event.data.action == "notify") {
            if (event.data.app == "Message") {
                if (!isInChat) {
                    New_Notification(event.data.app, event.data.app, event.data.title, event.data.message, "Jetzt")
                }
            }
        } else if (event.data.action == "updateChat") {
            if (isInChat) {
                if (This_Messages_Number == event.data.number) {
                    let date = new Date(event.data.time * 1000)

                    const hours = checkTime(date.getHours())
                    const minutes = checkTime(date.getMinutes())

                    if (event.data.coords[0] && event.data.coords[1]) {
                        Load_Messaging_Contents(Last_Message_DataId, Last_Message_Id, 'Location: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', event.data.type, `${hours}:${minutes}`, event.data.coords[0], event.data.coords[1])
                        Last_Message_Id++
                        Last_Message_DataId++
                        return
                    }

                    Load_Messaging_Contents(Last_Message_DataId, Last_Message_Id, event.data.msg, event.data.type, `${hours}:${minutes}`)
                    Last_Message_Id++
                    Last_Message_DataId++

                    var element = document.getElementById("Messaging-Contents")
                    element.scrollTop = element.scrollHeight
                }
            }
        } else if (event.data.action == "updateMessages") {
            $(".Messages-Content-Box").remove()
            event.data.msgs.forEach((message, index) => {
                index = index
                var date = new Date(message.date * 1000)
                Load_Messages_Contents(index, message.number, message.author, message.msg, date.toLocaleString(), "Read")
            })
        } else if (event.data.action == "updateGroupChat") {
            if (isInGroupChat) {
                if (This_Whatsapp_DataId == event.data.groupId && event.data.number != myNumber) {
                    const date = new Date(event.data.time * 1000)
                    const hours = checkTime(date.getHours())
                    const minutes = checkTime(date.getMinutes())
            
                    if (event.data.coords) {
                        if (event.data.coords[0] && event.data.coords[1]) {
                            Load_Whatsapping_Contents(Last_Whatsapp_DataId, Last_Whatsapp_Id, event.data.author, 'Location: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', event.data.type, `${hours}:${minutes}`, event.data.coords[0], event.data.coords[1])
                            Last_Whatsapp_Id++
                            Last_Whatsapp_DataId++
                            return
                        }
                    }
            
                    Load_Whatsapping_Contents(Last_Whatsapp_DataId, Last_Whatsapp_Id, event.data.author, event.data.msg, event.data.type, `${hours}:${minutes}`, "X", "Y")
                    Last_Whatsapp_Id++
                    Last_Whatsapp_DataId++
            
                    setTimeout(function() {
                        $("#Whatsapping-Contents").scrollTop($("#Whatsapping-Contents").prop("scrollHeight"))
                    }, 20)
                }
            }
        } else if (event.data.action == "updateGroupMessages") {
            $(".Whatsapp-Content-Box").remove()
            
            event.data.groups.forEach((group, index) => {
                var hours = '0:00'

                if (group.date != 0) {
                    const date = new Date(group.date * 1000)
                    var hours = `${date.getHours()}:${date.getMinutes()}`
                }
    
                if (group.msg.includes("jpg") || group.msg.includes("png")) {
                    group.msg = 'Bild'
                }
    
                Load_Whatsapp_Contents(group.id, index, group.name, group.msg, hours, group.avatar, "Read")
            })
        }
    })

    window.addEventListener("keyup", function(event) {
        if (event.key == "Escape") {
            if (currentApp != 'Camera' && !cameraFocus && !Camera_Shooting) {
                $.post('https://cc_phone/closePhone', JSON.stringify({}))
            }
        }
    })

    window.addEventListener('auxclick', function(event) {
        if (currentApp == 'Camera' || cameraFocus) {
            Camera_State = !Camera_State
        
            $.post('https://cc_phone/cameraState', JSON.stringify({
                state: Camera_State
            }))
        }
    })
})

const Dark_Theme = {
    Back_W_C: 'hsla(0deg 0% 100% / 1)',
    Back_B_C: 'hsla(0deg 0% 0% / 1)',
    Texts_W_C: 'hsla(0deg 0% 100% / 1)',
    Texts_B_C: 'hsla(0deg 0% 0% / 1)',
    Icons_W_C: 'hsla(0deg 0% 100% / 1)',
    Icons_B_C: 'hsla(0deg 0% 0% / 1)',
    Back_C: 'hsla(0deg 0% 0% / 1)',
    Back_S_C: 'hsla(240deg 3% 15% / 1)',
    Back_D_C: 'hsla(0deg 0% 17% / 1)',
    Back_I_C: 'hsla(0deg 0% 0% / 0)',
    Back_DI_C: 'hsla(0deg 0% 10% / 0.5)',
    Back_A_C: 'hsla(209deg 100% 50% / 1)',
    Back_R_C: 'hsla(3deg 94% 66% / 1)',
    Back_A_C_O1: 'hsla(209deg 100% 50% / 0.2)',
    Back_A_R_O1: 'hsla(3deg 94% 66% / 0.2)',
    Back_A_C_O2: 'hsla(209deg 100% 50% / 0.522)',
    Back_A_R_O2: 'hsla(3deg 94% 66% / 0.522)',
    Line_C: 'hsla(0deg 0% 100% / 1)',
    Texts_C: 'hsla(0deg 0% 100% / 1)',
    Texts_A_C: 'hsla(209deg 100% 50% / 1)',
    Texts_R_C: 'hsla(3deg 89% 67% / 1)',
    Texts_L_C: 'hsla(250deg 3% 56% / 1)',
    Texts_D_C: 'hsla(0deg 0% 17% / 1)',
    Icons_C: 'hsla(0deg 0% 100% / 1)',
    Icons_A_C: 'hsla(209deg 100% 50% / 1)',
    Icons_R_C: 'hsla(3deg 89% 67% / 1)',
    Icons_L_C: 'hsla(250deg 3% 56% / 1)',
    Icons_D_C: 'hsla(0deg 0% 17% / 1)',
    Top_Bar_C: 'hsla(0deg 0% 0% / 0)',
    Bottom_Bar_C: 'hsla(0deg 0% 7% / 1)',
    Top_Field_C: 'hsla(0deg 0% 7% / 1)',
    Msg_Send_C: 'hsla(139deg 100% 22% / 1)',
    Msg_Recive_C: 'hsla(0deg 0% 20% / 1)',
    NumBub_C: 'hsla(0deg 0% 20% / 1)',
    Avatar_Back_C: 'hsla(224deg 7% 59% / 1)',
    NumBub_H_C: 'hsla(0deg 0% 65% / 1)',
    Back_Btn_C: 'hsla(0deg 0% 100% / 1)',
    Fav_I_C: 'hsla(0deg 0% 0% / 0)',
    Fav_O_C: 'hsla(209deg 100% 50% / 1)',
    Fav_Rec_I_C: 'hsla(0deg 0% 0% / 0)',
    Fav_Rec_O_C: 'hsla(209deg 100% 50% / 1)',
    Fav_Rec_D_C: 'hsla(0deg 0% 17% / 1)',
    Fav_Rec_R_C: 'hsla(3deg 89% 67% / 1)',
    Blur_Back_C: 'hsla(0deg 0% 0% / 0.8)',
    BackDrop_Back_C: 'hsla(0deg 0% 15% / 0.5)',
    M_App_Texts_C: 'hsla(0deg 0% 100% / 1)',
    Slider_C: 'hsla(0deg 0% 90% / 1)',
}

const Light_Theme = {
    Back_W_C: 'hsla(0deg 0% 100% / 1)',
    Back_B_C: 'hsla(0deg 0% 0% / 1)',
    Texts_W_C: 'hsla(0deg 0% 100% / 1)',
    Texts_B_C: 'hsla(0deg 0% 0% / 1)',
    Icons_W_C: 'hsla(0deg 0% 100% / 1)',
    Icons_B_C: 'hsla(0deg 0% 0% / 1)',
    Back_C: 'hsla(0deg 0% 100% / 1)',
    Back_S_C: 'hsla(240deg 3% 85% / 1)',
    Back_D_C: 'hsla(0deg 0% 83% / 1)',
    Back_I_C: 'hsla(0deg 0% 100% / 0)',
    Back_DI_C: 'hsla(0deg 0% 93% / 0.5)',
    Back_A_C: 'hsla(209deg 100% 50% / 1)',
    Back_R_C: 'hsla(3deg 94% 66% / 1)',
    Back_A_C_O1: 'hsla(209deg 100% 50% / 0.2)',
    Back_A_R_O1: 'hsla(3deg 94% 66% / 0.2)',
    Back_A_C_O2: 'hsla(209deg 100% 50% / 0.522)',
    Back_A_R_O2: 'hsla(3deg 94% 66% / 0.522)',
    Line_C: 'hsla(0deg 0% 0% / 1)',
    Texts_C: 'hsla(0deg 0% 0% / 1)',
    Texts_A_C: 'hsla(209deg 100% 50% / 1)',
    Texts_R_C: 'hsla(3deg 89% 67% / 1)',
    Texts_L_C: 'hsla(250deg 3% 44% / 1)',
    Texts_D_C: 'hsla(0deg 0% 83% / 1)',
    Icons_C: 'hsla(0deg 0% 0% / 1)',
    Icons_A_C: 'hsla(209deg 100% 50% / 1)',
    Icons_R_C: 'hsla(3deg 89% 67% / 1)',
    Icons_L_C: 'hsla(250deg 3% 44% / 1)',
    Icons_D_C: 'hsla(0deg 0% 83% / 1)',
    Top_Bar_C: 'hsla(0deg 0% 100% / 0)',
    Bottom_Bar_C: 'hsla(0deg 0% 93% / 1)',
    Top_Field_C: 'hsla(0deg 0% 93% / 1)',
    Msg_Send_C: 'hsla(139deg 100% 22% / 1)',
    Msg_Recive_C: 'hsla(0deg 0% 80% / 1)',
    NumBub_C: 'hsla(0deg 0% 80% / 1)',
    Avatar_Back_C: 'hsla(224deg 7% 41% / 1)',
    NumBub_H_C: 'hsla(0deg 0% 35% / 1)',
    Back_Btn_C: 'hsla(0deg 0% 0% / 1)',
    Fav_I_C: 'hsla(0deg 0% 100% / 0)',
    Fav_O_C: 'hsla(209deg 100% 50% / 1)',
    Fav_Rec_I_C: 'hsla(0deg 0% 100% / 0)',
    Fav_Rec_O_C: 'hsla(209deg 100% 50% / 1)',
    Fav_Rec_D_C: 'hsla(0deg 0% 83% / 1)',
    Fav_Rec_R_C: 'hsla(3deg 89% 67% / 1)',
    Blur_Back_C: 'hsla(0deg 0% 0% / 0.8)',
    BackDrop_Back_C: 'hsla(0deg 0% 15% / 0.5)',
    M_App_Texts_C: 'hsla(0deg 0% 100% / 1)',
    Slider_C: 'hsla(0deg 0% 90% / 1)',
}

function Set_Dark_Theme() {
    $(':root').css('--Back-W-C', Dark_Theme.Back_W_C)
    $(':root').css('--Back-B-C', Dark_Theme.Back_B_C)
    $(':root').css('--Texts-W-C', Dark_Theme.Texts_W_C)
    $(':root').css('--Texts-B-C', Dark_Theme.Texts_B_C)
    $(':root').css('--Icons-W-C', Dark_Theme.Icons_W_C)
    $(':root').css('--Icons-B-C', Dark_Theme.Icons_B_C)
    $(':root').css('--Back-C', Dark_Theme.Back_C)
    $(':root').css('--Back-S-C', Dark_Theme.Back_S_C)
    $(':root').css('--Back-D-C', Dark_Theme.Back_D_C)
    $(':root').css('--Back-I-C', Dark_Theme.Back_I_C)
    $(':root').css('--Back-DI-C', Dark_Theme.Back_DI_C)
    $(':root').css('--Back-A-C', Dark_Theme.Back_A_C)
    $(':root').css('--Back-R-C', Dark_Theme.Back_R_C)
    $(':root').css('--Back-A-C-O1', Dark_Theme.Back_A_C_O1)
    $(':root').css('--Back-A-R-O1', Dark_Theme.Back_A_R_O1)
    $(':root').css('--Back-A-C-O2', Dark_Theme.Back_A_C_O2)
    $(':root').css('--Back-A-R-O2', Dark_Theme.Back_A_R_O2)
    $(':root').css('--Line-C', Dark_Theme.Line_C)
    $(':root').css('--Texts-C', Dark_Theme.Texts_C)
    $(':root').css('--Texts-A-C', Dark_Theme.Texts_A_C)
    $(':root').css('--Texts-R-C', Dark_Theme.Texts_R_C)
    $(':root').css('--Texts-L-C', Dark_Theme.Texts_L_C)
    $(':root').css('--Texts-D-C', Dark_Theme.Texts_D_C)
    $(':root').css('--Icons-C', Dark_Theme.Icons_C)
    $(':root').css('--Icons-A-C', Dark_Theme.Icons_A_C)
    $(':root').css('--Icons-R-C', Dark_Theme.Icons_R_C)
    $(':root').css('--Icons-L-C', Dark_Theme.Icons_L_C)
    $(':root').css('--Icons-D-C', Dark_Theme.Icons_D_C)
    $(':root').css('--Top-Bar-C', Dark_Theme.Top_Bar_C)
    $(':root').css('--Bottom-Bar-C', Dark_Theme.Bottom_Bar_C)
    $(':root').css('--Top-Field-C', Dark_Theme.Top_Field_C)
    $(':root').css('--Msg-Send-C', Dark_Theme.Msg_Send_C)
    $(':root').css('--Msg-Recive-C', Dark_Theme.Msg_Recive_C)
    $(':root').css('--NumBub-C', Dark_Theme.NumBub_C)
    $(':root').css('--Avatar-Back-C', Dark_Theme.Avatar_Back_C)
    $(':root').css('--NumBub-H-C', Dark_Theme.NumBub_H_C)
    $(':root').css('--Back-Btn-C', Dark_Theme.Back_Btn_C)
    $(':root').css('--Fav-I-C', Dark_Theme.Fav_I_C)
    $(':root').css('--Fav-O-C', Dark_Theme.Fav_O_C)
    $(':root').css('--Fav-Rec-I-C', Dark_Theme.Fav_Rec_I_C)
    $(':root').css('--Fav-Rec-O-C', Dark_Theme.Fav_Rec_O_C)
    $(':root').css('--Fav-Rec-D-C', Dark_Theme.Fav_Rec_D_C)
    $(':root').css('--Fav-Rec-R-C', Dark_Theme.Fav_Rec_R_C)
    $(':root').css('--Blur-Back-C', Dark_Theme.Blur_Back_C)
    $(':root').css('--BackDrop-Back-C', Dark_Theme.BackDrop_Back_C)
    $(':root').css('--M-App-Texts-C', Dark_Theme.M_App_Texts_C)
    $(':root').css('--Slider-C', Dark_Theme.Slider_C)
}

function Set_Light_Theme() {
    $(':root').css('--Back-W-C', Light_Theme.Back_W_C)
    $(':root').css('--Back-B-C', Light_Theme.Back_B_C)
    $(':root').css('--Texts-W-C', Light_Theme.Texts_W_C)
    $(':root').css('--Texts-B-C', Light_Theme.Texts_B_C)
    $(':root').css('--Icons-W-C', Light_Theme.Icons_W_C)
    $(':root').css('--Icons-B-C', Light_Theme.Icons_B_C)
    $(':root').css('--Back-C', Light_Theme.Back_C)
    $(':root').css('--Back-S-C', Light_Theme.Back_S_C)
    $(':root').css('--Back-D-C', Light_Theme.Back_D_C)
    $(':root').css('--Back-I-C', Light_Theme.Back_I_C)
    $(':root').css('--Back-DI-C', Light_Theme.Back_DI_C)
    $(':root').css('--Back-A-C', Light_Theme.Back_A_C)
    $(':root').css('--Back-R-C', Light_Theme.Back_R_C)
    $(':root').css('--Back-A-C-O1', Light_Theme.Back_A_C_O1)
    $(':root').css('--Back-A-R-O1', Light_Theme.Back_A_R_O1)
    $(':root').css('--Back-A-C-O2', Light_Theme.Back_A_C_O2)
    $(':root').css('--Back-A-R-O2', Light_Theme.Back_A_R_O2)
    $(':root').css('--Line-C', Light_Theme.Line_C)
    $(':root').css('--Texts-C', Light_Theme.Texts_C)
    $(':root').css('--Texts-A-C', Light_Theme.Texts_A_C)
    $(':root').css('--Texts-R-C', Light_Theme.Texts_R_C)
    $(':root').css('--Texts-L-C', Light_Theme.Texts_L_C)
    $(':root').css('--Texts-D-C', Light_Theme.Texts_D_C)
    $(':root').css('--Icons-C', Light_Theme.Icons_C)
    $(':root').css('--Icons-A-C', Light_Theme.Icons_A_C)
    $(':root').css('--Icons-R-C', Light_Theme.Icons_R_C)
    $(':root').css('--Icons-L-C', Light_Theme.Icons_L_C)
    $(':root').css('--Icons-D-C', Light_Theme.Icons_D_C)
    $(':root').css('--Top-Bar-C', Light_Theme.Top_Bar_C)
    $(':root').css('--Bottom-Bar-C', Light_Theme.Bottom_Bar_C)
    $(':root').css('--Top-Field-C', Light_Theme.Top_Field_C)
    $(':root').css('--Msg-Send-C', Light_Theme.Msg_Send_C)
    $(':root').css('--Msg-Recive-C', Light_Theme.Msg_Recive_C)
    $(':root').css('--NumBub-C', Light_Theme.NumBub_C)
    $(':root').css('--Avatar-Back-C', Light_Theme.Avatar_Back_C)
    $(':root').css('--NumBub-H-C', Light_Theme.NumBub_H_C)
    $(':root').css('--Back-Btn-C', Light_Theme.Back_Btn_C)
    $(':root').css('--Fav-I-C', Light_Theme.Fav_I_C)
    $(':root').css('--Fav-O-C', Light_Theme.Fav_O_C)
    $(':root').css('--Fav-Rec-I-C', Light_Theme.Fav_Rec_I_C)
    $(':root').css('--Fav-Rec-O-C', Light_Theme.Fav_Rec_O_C)
    $(':root').css('--Fav-Rec-D-C', Light_Theme.Fav_Rec_D_C)
    $(':root').css('--Fav-Rec-R-C', Light_Theme.Fav_Rec_R_C)
    $(':root').css('--Blur-Back-C', Light_Theme.Blur_Back_C)
    $(':root').css('--BackDrop-Back-C', Light_Theme.BackDrop_Back_C)
    $(':root').css('--M-App-Texts-C', Light_Theme.M_App_Texts_C)
    $(':root').css('--Slider-C', Light_Theme.Slider_C)
}

function openPhone() {
    $("#Frame").show()
    $("#Frame").removeClass().addClass("Show-Frame")
    isPhoneOpen = true
}

function getNotifyopenPhone() {
    $("#Frame").removeClass().addClass("Show-Notify-Frame")
}

function getNotifyclosePhone() {
    $("#Frame").removeClass().addClass("Close-Notify-Frame")
}

function closePhone() {
    $("#Frame").removeClass().addClass("Hide-Frame")
    isPhoneOpen = false
}

function copyStuff(value) {
    var element = document.createElement('textarea')
    element.value = value
    element.setAttribute('readonly', '')

    element.style = {
        position: 'absolute',
        left: '-9999vh'
    }

    document.body.appendChild(element)
    element.select()
    document.execCommand('copy')
    document.body.removeChild(element)
}

function focusPhone(state) {
    $.post('https://cc_phone/focus', JSON.stringify({
        state: state
    }))
}

$(document).on('focus', '#Notes-Textbox, #Background-Setting-Textbox, #Radio-Textbox, #Dispatch-Form-Textbox, #Business-Caption-Edit-Textbox, #Contacts-Search-Bar-Textbox, #Messages-Search-Bar-Textbox, #Messaging-Bar-Textbox, #Edit-Contact-Name, #Edit-Contact-Num, #New-Contact-Name, #New-Contact-Num, #Add-Whatsapp-Textbox, #Whatsapp-Search-Bar-Textbox, #Dispatching-Bar-Textbox, #Whatsapping-Bar-Textbox, #Edit-Whatsapp-GPName-Edit-Textbox, #Edit-Whatsapp-Avatar-Edit-Textbox', function() {
    focusPhone(true)
})

$(document).on('focusout', '#Notes-Textbox, #Background-Setting-Textbox, #Radio-Textbox, #Dispatch-Form-Textbox, #Business-Caption-Edit-Textbox, #Contacts-Search-Bar-Textbox, #Messages-Search-Bar-Textbox, #Messaging-Bar-Textbox, #Edit-Contact-Name, #Edit-Contact-Num, #New-Contact-Name, #New-Contact-Num, #Add-Whatsapp-Textbox, #Whatsapp-Search-Bar-Textbox, #Dispatching-Bar-Textbox, #Whatsapping-Bar-Textbox, #Edit-Whatsapp-GPName-Edit-Textbox, #Edit-Whatsapp-Avatar-Edit-Textbox', function() {
    focusPhone(false)
})

$(document).on('keydown', function(event) {
    if (event.keyCode == 9) {
       event.preventDefault()
    }
})

function secondsToTime(seconds, showMs) {
    return new Date(seconds * 1000).toISOString().substr(showMs ? 17 : 15, 4)
}

function checkTime(input) {
    if (input < 10) {
        input = `0${input}`
    }

    return input
}

// vars

// home
var currentApp = ""
var cameraFocus = false
var debug = false
var isInChat = false
var isInGroupChat = false
var isInContacts = false
var isPhoneOpen = false
var isDarkThemeOn = true
var businessCount = 0
var callFrequenz = null

var myRpName = ""
var myNumber = ""

// dispatch
var This_Dispatch_Contents_Box
var This_Dispatch_Contents_Box_Name
var This_Dispatch_Contents_Box_Label
var This_Dispatch_Inbox_Box
var This_Dispatch_Inbox_Id
var This_Dispatch_Inbox_DataId
var This_Dispatch_Inbox_Name
var This_Dispatch_Inbox_Number
var Last_Dispatch_Id = 1
var Last_Dispatch_DataId = 6
var This_Dispatch_Type


var This_Dispatch_Inbox_uniqueId
var This_Dispatch_Inbox_playerId
var This_Dispatch_Inbox_job
var This_Dispatch_Inbox_x
var This_Dispatch_Inbox_y
var This_Dising_Loc_Box
var This_Dising_Loc_Box_Id
var This_Dising_Loc_Box_Location = ""
var Dispatch_State = 0 // 0 send // 1 Inbox
var Dispatch_State_Send = 0 // 0 = home, 1 = form
var Dispatch_State_Inbox = 0 // 0 = home, 1 = form

// camera
var Camera_Flash_State = "Off"
var Camera_State = true
var Camera_Shooting = false

// phone
var This_Favorites_Box_Id
var This_Favorites_Box_DataId
var This_Favorites_Box_DbId
var This_Favorites_Box_Name
var This_Favorites_Box_Number
var This_Favorites_Box

var Dial_Text_Now

var Call_Timer
var Call_Is_Mute = false
var counter = 0

var This_Recents_Box
var This_Recents_Box_Id
var This_Recents_Box_DataId
var This_Recents_Box_DbId
var This_Recents_Box_Contact
var This_Recents_Box_ContactDbId
var This_Recents_Name
var This_Recents_Number
var This_Recents_IsCon
var This_Recents_IsFav

var Call_Before_Section

// Contact
var This_Contact_Box
var This_Contact_Id
var Add_Before_Section

var New_Contact_Has_Name_And_Num
var New_Contact_Name
var New_Contact_Num

var New_Is_Fav

var Edit_Contact_Has_Name_And_Num
var Edit_Contact_DataId
var Edit_Contact_Name
var Edit_Contact_Num

var Edit_Is_Fav

// messages

var This_Messages_Box
var This_Messages_Id
var This_Messages_DataId
var This_Messages_Name
var This_Messages_Number
var Last_Message_Id = 1
var Last_Message_DataId = 6

var Messaging_Before_Section
var This_Mesing_Loc_Box
var This_Mesing_Loc_Box_Id
var This_Mesing_Loc_Box_Location = ""

// whatsapp

var This_Whatsapp_Box
var This_Whatsapp_Id
var This_Whatsapp_DataId
var This_Whatsapp_Group
var This_Whatsapp_Number
var Last_Whatsapp_Id = 1
var Last_Whatsapp_DataId = 6
var This_Whatsapp_UserId = "User"

var This_Edit_Whatsapp_User_Box_Id
var This_Edit_Whatsapp_User_Box_DataId
var This_Edit_Whatsapp_User_Box_Perm
var This_Edit_Whatsapp_User_Box_Name
var This_Edit_Whatsapp_User_Box_Info
var This_Edit_Whatsapp_User_Box

// whatsapp groups
var This_Member_Perm = 2
var This_Whatsapp_Add_Members = false

// business
var Bussiness_IsAdmin
var This_Business_Radio = false

var This_Business_Box
var This_Business_Box_Id
var This_Business_Box_DataId
var This_Business_Rank
var This_Business_Job3

// Call-PopUp

var Incoming_Call

// Notification-PopUp-

var Notif_Time
var Is_Notif_On = false

// settings
var Volume_Status = 10
var User_Theme_Mode = "Dark"

//----------------------------------------------------------------------------------------------------Radio

$(document).on("click", "#M-App-1", function() {
    $("#Radio").addClass("Show-App").removeClass("Hide-App")
    currentApp = "Radio"
})

$(document).on("click", "#Radio-Top-Field-Back", (Radio_Back = function Radio_Back() {
    $("#Radio").removeClass("Show-App").addClass("Hide-App")
    currentApp = "Home"
}))

$(document).on("click", "#Radio-Click-Back", function() {
    Radio_Back()
})

$(document).on("click", "#Radio-Join", function() {
    const frequenz = $("#Radio-Textbox").val()

    if (frequenz != undefined && frequenz != "") {
        $.post("https://cc_phone/joinRadio", JSON.stringify({
            frequenz: frequenz,
        })).done((can) => {
            if (can) {
                New_Notification("Radio", "Radio", "Funk", "Du bist dem Funk " + frequenz + " beigetreten!", "Jetzt")
            } else {
                New_Notification("Radio", "Radio", "Funk", "Dieser Funk ist gesperrt!", "Jetzt")
            }
        })
    } else {
        New_Notification("Radio", "Radio", "Funk", "Der Funkt " + frequenz + " ist ungültig!", "Jetzt")
    }
})

$(document).on("click", "#Radio-Leave", function() {
    New_Notification("Radio", "Radio", "Funk", "Du hast den Funk verlassen!", "Jetzt")
    $.post("https://cc_phone/leaveRadio", JSON.stringify({}))
})

//----------------------------------------------------------------------------------------------------Dispatch

$(document).on("click", "#M-App-4", function() {
    currentApp = "Dispatch"

    $.post('https://cc_phone/getDispatchJobs', JSON.stringify({
    })).done((dispatch) => {
        if (dispatch.haveAccess) {
            $("#Dispatch-Bottom-Bar").css("display", "block")
        } else {
            $("#Dispatch-Bottom-Bar").css("display", "none")
        }

        $("#Dispatch-Send-Contents").empty()

        dispatch.dispatches.forEach((item) => {
            $("#Dispatch-Send-Contents").append(`
                <div id="` + item.label + `-Box" class="Dispatch-Send-Contents-Box" data-name="` + item.name + `">
                    <div id="`+ item.label + `-Title" class="Dispatch-Send-Contents-Title">` + item.label + `</div>
                </div>

                <div class="Dispatch-Send-Content-Box-Line"></div>
            `)
        })
    })

    Load_Dispatch_Send()
    $("#Dispatch").addClass("Show-App").removeClass("Hide-App")
})

$(document).on("click", "#Dispatch-Bottom-Bar-Button-S", (Load_Dispatch_Send = function Load_Dispatch_Send() {
    //Section
    $("#Dispatch-Send-Section").css("display", "block")
    $("#Dispatch-Inbox-Section").removeClass()
    $("#Dispatch-Inbox-Type-Section").css("display", "none")

    //Fill
    $("#Dispatch-Bottom-Bar-Icon-Send").css("fill", "var(--Icons-A-C)")
    $("#Dispatch-Bottom-Bar-Icon-Inbox").css("fill", "var(--Icons-C)")

    //Color
    $("#Dispatch-Bottom-Bar-Text-Send").css("color", "var(--Texts-A-C)")
    $("#Dispatch-Bottom-Bar-Text-Inbox").css("color", "var(--Texts-C)")

    Dispatch_State = 0

    if (Dispatch_State_Send == 1) {
        Dispatch_Back()
    
        setTimeout(() => {
            $("#Dispatch-Form").removeClass()
        }, 300)
    }
}))

function Load_Dispatch_Inbox_Contents(DispInb_DataId, DispInb_Id, DispInb_Name, DispInb_Last, DispInb_Time, DispInb_IsRead, uniqueId, playerId, job, x, y) {
    const escapedId = escapeHtml(DispInb_Id);
    const escapedName = escapeHtml(DispInb_Name);
    const escapedLast = escapeHtml(DispInb_Last);
    const escapedTime = escapeHtml(DispInb_Time);
    const escapedIsRead = escapeHtml(DispInb_IsRead);
    const escapedUniqueId = escapeHtml(uniqueId);
    const escapedPlayerId = escapeHtml(playerId);
    const escapedJob = escapeHtml(job);
    
    const dispatchItem = `
        <div id="Dispatch-Inbox-Content-Box-${escapedId}" class="Dispatch-Inbox-Content-Box" data-playerId="${escapedPlayerId}" data-x="${escapeHtml(x)}" data-y="${escapeHtml(y)}" data-job="${escapedJob}" data-uniqueId="${escapedUniqueId}">
            <div id="Dispatch-Inbox-Content-Box-Read-${escapedId}" class="Dispatch-Inbox-Content-Box-${escapedIsRead}"></div>
            
            <div id="Dispatch-Inbox-Content-Box-Avatar-${escapedId}" class="Dispatch-Inbox-Content-Box-Avatar">
                <svg id="Dispatch-Inbox-Content-Box-Avatar-Img-${escapedId}" class="Dispatch-Inbox-Content-Box-Avatar-Img" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.6vh" height="3vh" viewBox="0 0 26 30">
                    <g fill="var(--Icons-C)" stroke="none" transform="translate(0,30) scale(0.1,-0.1)">
                        <path d="M80 280 c-27 -27 -27 -93 0 -120 30 -30 83 -27 109 6 27 34 27 74 0 108 -26 33 -79 36 -109 6z"/>
                        <path d="M32 99 c-19 -13 -32 -28 -30 -38 4 -22 85 -61 128 -61 42 0 118 33 126 54 22 57 -151 91 -224 45z"/>
                    </g>
                </svg>
            </div>

            <div id="Dispatch-Inbox-Content-Box-Name-${escapedId}" class="Dispatch-Inbox-Content-Box-Name">${escapedName}</div>
            <div id="Dispatch-Inbox-Content-Box-Last-${escapedId}" class="Dispatch-Inbox-Content-Box-Last">${escapedLast}</div>
            <div id="Dispatch-Inbox-Content-Box-Time-${escapedId}" class="Dispatch-Inbox-Content-Box-Time">${escapedTime}</div>
                <svg id="Dispatch-Inbox-Content-Box-Icon-${escapedId}" Class="Dispatch-Inbox-Content-Box-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="1.2vh" height="2vh" viewBox="0 0 476 800">
                <g id="Dispatch-Inbox-Content-Box-Img-${escapedId}" Class="Dispatch-Inbox-Content-Box-Img" transform="translate(0,800) scale(0.1,-0.1)">
                    <path d="M3845 7984 c-99 -22 -203 -68 -282 -124 -43 -31 -683 -664 -1750 -1732 l-1681 -1683 -51 -105 c-110 -230 -110 -450 0 -680 l51 -105 1681 -1683 c925 -926 1710 -1704 1744 -1728 135 -98 264 -138 443 -138 145 0 213 15 335 74 192 93 344 278 400 485 53 198 16 431 -97 608 -29 45 -427 450 -1421 1444 l-1382 1383 1382 1382 c994 995 1392 1400 1421 1445 113 177 150 410 97 608 -69 257 -283 470 -540 540 -88 24 -264 28 -350 9z"/>
                </g>
            </svg>

            <div id="Dispatch-Inbox-Content-Box-Line-${escapedId}" class="Dispatch-Inbox-Content-Box-Line"></div>
        </div>

        <div id="Dispatch-Inbox-Space-From-Bottom"></div>
    `
    
    $("#Dispatch-Inbox-Space-From-Bottom").remove()
    $("#Dispatch-Inbox-Contents").append(dispatchItem)
}

$(document).on("click", "#Dispatch-Bottom-Bar-Button-I", (Load_Dispatch_Inbox = function Load_Dispatch_Inbox() {
    $("#Dispatch-Send-Section").css("display", "none")
    $("#Dispatch-Inbox-Section").removeClass()
    $("#Dispatch-Inbox-Type-Section").css("display", "block")

    $("#Dispatch-Bottom-Bar-Icon-Send").css("fill", "var(--Icons-C)")
    $("#Dispatch-Bottom-Bar-Icon-Inbox").css("fill", "var(--Icons-A-C)")

    $("#Dispatch-Bottom-Bar-Text-Send").css("color", "var(--Texts-C)")
    $("#Dispatch-Bottom-Bar-Text-Inbox").css("color", "var(--Texts-A-C)")
    
    if (Dispatch_State == 0 && Dispatch_State_Send == 1) {
        $("#Dispatch-Form").removeClass("Show-Dispatch-Form").addClass("Hide-Dispatch-Form")
        Dispatch_State_Send = 0
    
        setTimeout(function() {
            $("#Dispatch-Form-Textbox").val("")
        }, 400)
    } else if (Dispatch_State == 1 && Dispatch_State_Inbox == 1) {
        $("#Dispatch-Inbox-Section").removeClass('Show-Inbox-Dispatching').addClass('Hide-Inbox-Dispatching')
        Dispatch_State_Inbox = 0
    }

    Dispatch_State = 1
    $("#Dispatch-Form").removeClass()

    $.post('https://cc_phone/getDispatches', JSON.stringify({
    })).done((data) => {
        data.dispatches.sort(function (a, b) {
            return b.time - a.time
        })

        var openCount = 0
        var acceptCount = 0
        var declineCount = 0
        var closeCount = 0

        data.dispatches.forEach((item, index) => {
            switch (item.type) {
                case 'open':
                    openCount += 1
                break
                case 'accept':
                    acceptCount += 1
                break
                case 'decline':
                    declineCount += 1    
                break
                case 'close':
                    closeCount += 1
                break
            }
        })

        $("#dispatch-title").text(data.title)
        $("#dispatch-open-count").html(`Offene (${openCount})`)
        $("#dispatch-decline-count").html(`Abgelehnte (${declineCount})`)
        $("#dispatch-accept-count").html(`Akzeptierte (${acceptCount})`)
        $("#dispatch-close-count").html(`Geschlossene (${closeCount})`)
    })
}))

$(document).on("click", ".Dispatching-Button", function() {
    const type = $(this).attr('data-type')

    This_Dispatch_Type = type

    Dispatch_State_Inbox = 1
    $("#Dispatch-Inbox-Section").removeClass().addClass('Show-Inbox-Dispatching')

    $(".Dispatch-Inbox-Content-Box").remove()

    $.post('https://cc_phone/getDispatchType', JSON.stringify({
        type: type
    })).done((data) => {
        data.sort(function (a, b) {
            return b.time - a.time
        })

        data.forEach((item, index) => {
            const date = new Date(item.lastDate * 1000)

            Load_Dispatch_Inbox_Contents(index, index, item.rpName, item.lastMessage, `${date.getHours()}:${date.getMinutes()}` , "Read", item.uniqueId, item.playerId, item.job, item.coords[0], item.coords[1])
        })
    })
})

$(document).on("click", ".Dispatch-Send-Contents-Box", function() {
    This_Dispatch_Contents_Box = "#" + $(this).attr("id")
    This_Dispatch_Contents_Box_Name = This_Dispatch_Contents_Box.split("-").shift().substring(1)
    This_Dispatch_Contents_Box_Label = $(this).attr("data-name")
    $("#Dispatch-Form-Textbox").attr("placeholder", "Type Message to " + This_Dispatch_Contents_Box_Name + "...")
    $("#Dispatch-Form-Textbox").val("")

    $("#Dispatch-Form").addClass("Show-Dispatch-Form").removeClass("Hide-Dispatch-Form")
    Dispatch_State_Send = 1
})

$(document).on("click", "#Dispatch-Form-Send", function() {
    const message = $("#Dispatch-Form-Textbox").val()

    $("#Dispatch-Form-Textbox").val("")

    $("#Dispatch-Form").addClass("Show-Dispatch-Form").removeClass("Hide-Dispatch-Form")
    Dispatch_State_Send = 1

    New_Notification("Dispatch", "Dispatch", "Dispatch", "Du hast ein Dispatch abgesendet!", "Jetzt")

    $.post('https://cc_phone/sendDispatch', JSON.stringify({
        job: This_Dispatch_Contents_Box_Label,
        desc: message
    })).done((data) => {
        Dispatch_Back()
    })
})

function escapeHtml(text) {
    if (typeof text !== 'string') return text;
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function Load_Dispatching_Contents(Dising_DataId, Dising_Id, Dising_Text, Dising_Type, Dising_Time, x, y) {
    const escapedText = escapeHtml(Dising_Text);
    const escapedTime = escapeHtml(Dising_Time);
    const escapedId = escapeHtml(Dising_Id);
    const escapedDataId = escapeHtml(Dising_DataId);
    
    const dispatchItem = {
        RT: `
        <div id="Dispatching-Box-${escapedId}'" class="Dispatching-Box" data-Dising_DataId="${escapedDataId}">            
            <div id="Dispatching-Recive-Txt-${escapedId}'" class="Dispatching-Recive-Txt" data-Dispatching_Time="${escapedTime}">${escapedText}</div>
            <div id="Dispatching-Recive-Arrow-${escapedId}'" class="Dispatching-Recive-Arrow">
                <svg id="Dispatching-Recive-Arrow-Icon-${escapedId}'" Class="Dispatching-Recive-Arrow-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2vh" height="2.5vh" viewBox="0 0 61 75">
                    <g id="Dispatching-Recive-Arrow-Img${escapedId}'" Class="Dispatching-Recive-Arrow-Img" transform="translate(0,75) scale(0.1,-0.1)">
                        <path d="M2 528 l3 -223 34 -62 c39 -73 117 -151 187 -186 87 -44 149 -57 271 -57 118 0 133 7 68 34 -48 20 -107 78 -133 130 -34 67 -42 139 -42 374 l0 212 -196 0 -195 0 3 -222z" />
                    </g>
                </svg>
            </div>
        </div>
        <div id="Dispatching-Space-From-Bottom"></div>
        `,
        ST: `
        <div id="Dispatching-Box-${escapedId}'" class="Dispatching-Box" data-Dising_DataId="${escapedDataId}">            
            <div id="Dispatching-Send-Txt-${escapedId}'" class="Dispatching-Send-Txt" data-Dispatching_Time="${escapedTime}">${escapedText}'</div>
            <div id="Dispatching-Send-Arrow-${escapedId}'" class="Dispatching-Send-Arrow">
                <svg id="Dispatching-Send-Arrow-Icon-${escapedId}'" Class="Dispatching-Send-Arrow-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2vh" height="2.5vh" viewBox="0 0 61 75">
                    <g id="Dispatching-Send-Arrow-Img${escapedId}'" Class="Dispatching-Send-Arrow-Img" transform="translate(0,75) scale(0.1,-0.1)">
                        <path d="M2 528 l3 -223 34 -62 c39 -73 117 -151 187 -186 87 -44 149 -57 271 -57 118 0 133 7 68 34 -48 20 -107 78 -133 130 -34 67 -42 139 -42 374 l0 212 -196 0 -195 0 3 -222z" />
                    </g>
                </svg>
            </div>
        </div>
        <div id="Dispatching-Space-From-Bottom"></div>
        `,
        RL: `
        <div id="Dispatching-Box-${escapedId}" class="Dispatching-Box" data-Dising_DataId="${escapedDataId}" data-x="${escapeHtml(x)}" data-y="${escapeHtml(y)}">
            <div id="Dispatching-Recive-Txt-${escapedId}" class="Dispatching-Recive-Txt" data-Dispatching_Time="${escapedTime}">Location:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div id="Dispatching-Recive-Loc-Address-${escapedId}" class="Dispatching-Recive-Loc-Address">${escapedText}</div>
            <div id="Dispatching-Recive-Loc-${escapedId}" class="Dispatching-Recive-Loc">
                <svg id="Dispatching-Recive-Loc-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.4vh" height="4vh" viewBox="0 0 586 978">
                    <g id="Dispatching-Recive-Loc-Img" transform="translate(0,978) scale(0.1,-0.1)">
                        <path d="M2765 9768 c-573 -26 -1154 -239 -1620 -591 -746 -565 -1172 -1453 -1142 -2382 10 -296 72 -627 170 -906 26 -75 557 -1215 1397 -3005 745 -1586 1357 -2883 1360 -2883 5 0 2627 5574 2699 5737 199 451 275 1036 201 1547 -134 922 -699 1720 -1521 2149 -484 253 -982 361 -1544 334z m426 -1791 c364 -95 648 -384 741 -753 32 -128 32 -360 0 -488 -79 -314 -306 -581 -599 -706 -135 -57 -230 -74 -403 -74 -173 0 -268 17 -403 74 -233 100 -442 307 -542 538 -61 140 -79 236 -79 412 0 172 17 269 73 401 113 270 374 505 646 584 179 53 393 57 566 12z" />
                    </g>
                </svg>
            </div>

            <div id="Dispatching-Recive-Arrow-${escapedId}" class="Dispatching-Recive-Arrow">
                <svg id="Dispatching-Recive-Arrow-Icon-${escapedId}" Class="Dispatching-Recive-Arrow-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2vh" height="2.5vh" viewBox="0 0 61 75">
                    <g id="Dispatching-Recive-Arrow-Img${escapedId}" Class="Dispatching-Recive-Arrow-Img" transform="translate(0,75) scale(0.1,-0.1)">
                        <path d="M2 528 l3 -223 34 -62 c39 -73 117 -151 187 -186 87 -44 149 -57 271 -57 118 0 133 7 68 34 -48 20 -107 78 -133 130 -34 67 -42 139 -42 374 l0 212 -196 0 -195 0 3 -222z" />
                    </g>
                </svg>
            </div>
        </div>
        <div id="Dispatching-Space-From-Bottom"></div>
        `,
        SL: `
        <div id="Dispatching-Box-${escapedId}'" class="Dispatching-Box" data-Dising_DataId="${escapedDataId}">            
            <div id="Dispatching-Send-Txt-${escapedId}'" class="Dispatching-Send-Txt" data-Dispatching_Time="${escapedTime}">Location: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div id="Dispatching-Send-Loc-Address-${escapedId}'" class="Dispatching-Send-Loc-Address">${escapedText}'</div>
            <div id="Dispatching-Send-Loc-${escapedId}'" class="Dispatching-Send-Loc">
                <svg id="Dispatching-Send-Loc-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.4vh" height="4vh" viewBox="0 0 586 978">
                    <g id="Dispatching-Send-Loc-Img" transform="translate(0,978) scale(0.1,-0.1)">
                        <path d="M2765 9768 c-573 -26 -1154 -239 -1620 -591 -746 -565 -1172 -1453 -1142 -2382 10 -296 72 -627 170 -906 26 -75 557 -1215 1397 -3005 745 -1586 1357 -2883 1360 -2883 5 0 2627 5574 2699 5737 199 451 275 1036 201 1547 -134 922 -699 1720 -1521 2149 -484 253 -982 361 -1544 334z m426 -1791 c364 -95 648 -384 741 -753 32 -128 32 -360 0 -488 -79 -314 -306 -581 -599 -706 -135 -57 -230 -74 -403 -74 -173 0 -268 17 -403 74 -233 100 -442 307 -542 538 -61 140 -79 236 -79 412 0 172 17 269 73 401 113 270 374 505 646 584 179 53 393 57 566 12z" />
                    </g>
                </svg>
            </div>

            <div id="Dispatching-Send-Arrow-${escapedId}'" class="Dispatching-Send-Arrow">
                <svg id="Dispatching-Send-Arrow-Icon-${escapedId}'" Class="Dispatching-Send-Arrow-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2vh" height="2.5vh" viewBox="0 0 61 75">
                    <g id="Dispatching-Send-Arrow-Img${escapedId}'" Class="Dispatching-Send-Arrow-Img" transform="translate(0,75) scale(0.1,-0.1)">
                        <path d="M2 528 l3 -223 34 -62 c39 -73 117 -151 187 -186 87 -44 149 -57 271 -57 118 0 133 7 68 34 -48 20 -107 78 -133 130 -34 67 -42 139 -42 374 l0 212 -196 0 -195 0 3 -222z" />
                    </g>
                </svg>
            </div>
        </div>
        <div id="Dispatching-Space-From-Bottom"></div>
        `,
    }

    $("#Dispatching-Space-From-Bottom").remove()

    switch (Dising_Type) {
        case 'RT':
            $("#Dispatching-Contents").append(dispatchItem.RT)
        break
        case 'ST':
            $("#Dispatching-Contents").append(dispatchItem.ST)
        break
        case 'RL':
            $("#Dispatching-Contents").append(dispatchItem.RL)
        break
        case 'SL':
            $("#Dispatching-Contents").append(dispatchItem.SL)
        break
    }
}

function Load_Dispatching_TopField(DisTop_DataId, DisTop_Name, DisTop_Not) {
    $("#Dispatching-Top-Field-Name").text(DisTop_Name)
    $("#Dispatching-Top-Field-Back-Text").text(DisTop_Not)
    $("#Dispatching-Top-Field-DisTop_DataId").text(DisTop_DataId)

    if (DisTop_Not == "0") {
        $("#Dispatching-Top-Field-Back-Text").css("display", "none")
    } else { 
        $("#Dispatching-Top-Field-Back-Text").css("display", "flex")
    }
}

$(document).on('click', '.Dispatching-Box, .Messaging-Box, .Whatsapping-Box', function() {
    const x = $(this).attr('data-x')
    const y = $(this).attr('data-y')

    if (x != undefined && y != undefined) {
        $.post('https://cc_phone/setWaypoint', JSON.stringify({
            x: x,
            y: y
        }))
    }
})

$(document).on("click", ".Dispatch-Inbox-Content-Box", function() {
    This_Dispatch_Inbox_Box = "#" + $(this).attr("id")
    This_Dispatch_Inbox_Id = This_Dispatch_Inbox_Box.split("-").pop()
    This_Dispatch_Inbox_Name = $("#Dispatch-Inbox-Content-Box-Name-" + This_Dispatch_Inbox_Id).text()
    This_Dispatch_Inbox_DataId = $("#Dispatch-Inbox-Content-Box-DataId-" + This_Dispatch_Inbox_Id).text()
    This_Dispatch_Inbox_Message = $("#Dispatch-Inbox-Content-Box-Last-" + This_Dispatch_Inbox_Id).text()
    This_Dispatch_Inbox_uniqueId = $(this).attr('data-uniqueId')
    This_Dispatch_Inbox_job = $(this).attr('data-job')
    This_Dispatch_Inbox_playerId = $(this).attr('data-playerId')
    This_Dispatch_Inbox_x = $(this).attr('data-x')
    This_Dispatch_Inbox_y = $(this).attr('data-y')
    var All_UnRead_Dis = 0
    Load_Dispatching_TopField(This_Dispatch_Inbox_DataId, This_Dispatch_Inbox_Name, All_UnRead_Dis.toString())
    Last_Dispatch_Id = 1
    Last_Dispatch_DataId = 6

    $(".Dispatching-Box").remove()
    $("#Dispatching-Space-From-Top").remove()
    $("#Dispatching-Contents").append('<div id="Dispatching-Space-From-Top"></div>')

    switch (This_Dispatch_Type) {
        case 'open':
            $("#Dispatching-Bar-Accept-Text").text('Akzeptieren')
            $("#Dispatching-Bar-Accept").attr('data-type', 'accept')
            $("#Dispatching-Bar-Decline-Text").text('Ablehnen')
            $("#Dispatching-Bar-Decline").attr('data-type', 'decline')
            $("#Dispatching-Bar-Label").hide()
        break
        case 'accept':
            $("#Dispatching-Bar-Accept-Text").text('Eröffnen')
            $("#Dispatching-Bar-Accept").attr('data-type', 'open')
            $("#Dispatching-Bar-Decline-Text").text('Schließen')
            $("#Dispatching-Bar-Decline").attr('data-type', 'close')
            
            $("#Dispatching-Bar-Label").show()
        break
        case 'decline': 
            $("#Dispatching-Bar-Accept-Text").text('Eröffnen')
            $("#Dispatching-Bar-Accept").attr('data-type', 'open')
            $("#Dispatching-Bar-Decline-Text").text('Schließen')
            $("#Dispatching-Bar-Decline").attr('data-type', 'close')

            $("#Dispatching-Bar-Label").show()
        break
        case 'close':
            $("#Dispatching-Bar-Accept-Text").text('Eröffnen')
            $("#Dispatching-Bar-Decline").attr('data-type', 'open')
            $("#Dispatching-Bar-Decline-Text").text('Löschen')
            $("#Dispatching-Bar-Decline").attr('data-type', 'delete')

            $("#Dispatching-Bar-Label").show()
        break
    }

    $.post('https://cc_phone/getDispatchChat', JSON.stringify({
        uniqueId: This_Dispatch_Inbox_uniqueId
    })).done((data) => {

        if (data.reason != undefined) {
            $("#Dispatching-Bar-Label").text(data.reason)
        }

        data.chat.forEach((item, index) => {            
            const date = new Date(item.date * 1000)
            const hours = checkTime(date.getHours())
            const minutes = checkTime(date.getMinutes())

            if (item.coords) {
                if (item.coords[0] && item.coords[1]) {
                    Load_Dispatching_Contents(Last_Dispatch_DataId, Last_Dispatch_Id, "Mylocation", item.type, `${hours}:${minutes}`, item.coords[0], item.coords[1])
                    Last_Dispatch_Id++
                    Last_Dispatch_DataId++
                    return
                }
            }

            Load_Dispatching_Contents(Last_Dispatch_DataId, Last_Dispatch_Id, item.msg, item.type, `${hours}:${minutes}`)
            Last_Dispatch_Id++
            Last_Dispatch_DataId++
        })
    })

    $("#Dispatching").removeClass().addClass("Show-Dispatching")
    var element = document.getElementById("Dispatching-Contents")
    element.scrollTop = element.scrollHeight
})

$(document).on("click", ".Dispatching-Recive-Txt", function() {
    This_Dising_Loc_Box = "#" + $(this).parent().attr("id")
    This_Dising_Loc_Box_Id = This_Dising_Loc_Box.split("-").pop()
    This_Dising_Loc_Box_Location = $("#Dispatching-Recive-Loc-Address-" + This_Dising_Loc_Box_Id).text()
})

$(document).on("click", "#Dispatching-Bar-Accept", function() {
    const type = $(this).attr('data-type')

    $.post("https://cc_phone/acceptDispatch", JSON.stringify({
        uniqueId: This_Dispatch_Inbox_uniqueId,
        job: This_Dispatch_Inbox_job,
        playerId: This_Dispatch_Inbox_playerId,
        x: This_Dispatch_Inbox_x,
        y: This_Dispatch_Inbox_y,
        type: type
    }))

    Load_Dispatch_Inbox()
    $("#Dispatching").removeClass().addClass("Hide-Dispatching")
})

$(document).on("click", "#Dispatching-Bar-Decline", function() {
    const type = $(this).attr('data-type')

    $.post("https://cc_phone/declineDispatch", JSON.stringify({
        job: This_Dispatch_Inbox_job,
        uniqueId: This_Dispatch_Inbox_uniqueId,
        playerId: This_Dispatch_Inbox_playerId,
        type: type
    }))

    Load_Dispatch_Inbox()
    $("#Dispatching").removeClass().addClass("Hide-Dispatching")
})

$(document).on("click", "#Dispatching-Top-Field-Back", (Dispatching_Back = function Dispatching_Back() {
    $("#Dispatching").removeClass().addClass("Hide-Dispatching")
}))

$(document).on("click", "#Dispatching-Click-Back", function() {
    Dispatch_Out()

    setTimeout(function() {
        $("#Dispatching").removeClass().addClass("Hide-Dispatching")
    }, 400)
})

$(document).on("click", "#Dispatch-Top-Field-Back", (Dispatch_Back = function Dispatch_Back() {
    if (Dispatch_State == 0 && Dispatch_State_Send == 1 || Dispatch_State == 1 && Dispatch_State_Send == 1) {
        $("#Dispatch-Form").removeClass("Show-Dispatch-Form").addClass("Hide-Dispatch-Form")
        Dispatch_State_Send = 0
    
        setTimeout(function() {
            $("#Dispatch-Form-Textbox").val("")
        }, 400)
    } else if (Dispatch_State == 1 && Dispatch_State_Inbox == 1) {
        $("#Dispatch-Inbox-Section").removeClass('Show-Inbox-Dispatching').addClass('Hide-Inbox-Dispatching')
        Dispatch_State_Inbox = 0
    } else if (Dispatch_State == 0 && Dispatch_State_Send == 0) {
        Dispatch_Out()
    } else if (Dispatch_State == 1 && Dispatch_State_Inbox == 0) {
        Dispatch_Out()
    } else if (Dispatch_State == 1 && Dispatch_State_Inbox == 1) {
        Load_Dispatch_Inbox()
    }
}))

$(document).on("click", "#Dispatch-Click-Back", (Dispatch_Out = function Dispatch_Out() {
    $("#Dispatch").removeClass("Show-App").addClass("Hide-App")
    currentApp = "Home"

    setTimeout(function() {
        $("#Dispatch-Form").removeClass("Show-Dispatch-Form")
        $("#Dispatch-Form-Textbox").val("")
        $("#Dispatching").removeClass()
    }, 400)
}))

//----------------------------------------------------------------------------------------------------Camera

$(document).on("click", "#M-App-6", function() {
    currentApp = "Camera"

    $("#Camera-Stream").show()

    $.post('https://cc_phone/openCamera', JSON.stringify({}))
    
    Camera_Flash_State = 'Off'

    $.post('https://cc_phone/getGallery', JSON.stringify({
    })).done((gallery) => {
        if (gallery[0] != undefined) {
            $("#Camera-Preview-Img").attr('src', gallery[0].link)
        }
    })

    $("#Camera").attr("data-OpenAppMode", "false")
    $("#Camera-Flash-Btn").removeClass().addClass(`Camera-Flash-${Camera_Flash_State}`)
    $("#Camera").removeClass().addClass("Show-App")
})

$(document).on("click", "#Camera-Flash-Btn", function() {
    if (Camera_Flash_State == "Off") {
        Camera_Flash_State = "On"
    
        $.post('https://cc_phone/flashlight', JSON.stringify({
            state: true
        }))
    } else if (Camera_Flash_State == "On") {
        Camera_Flash_State = "Off"
            
        $.post('https://cc_phone/flashlight', JSON.stringify({
            state: false
        }))
    }

    $("#Camera-Flash-Btn").removeClass().addClass(`Camera-Flash-${Camera_Flash_State}`)
})

$(document).on("click", "#Camera-Rotate-Btn", function() {
    $.post('https://cc_phone/switchCam', JSON.stringify({}))
})

function takeShoot() {
    $.post('https://cc_phone/takePicture', JSON.stringify({})).done((data) => {
        const form = new FormData()
        form.append('type', 'base64')
        form.append('image', data.replace(/^data:image\/jpeg;base64,/, ""))
        
        fetch("https://api.imgur.com/3/image", {
            method: 'POST',
            body: form,
            headers: {
                Authorization: 'Client-ID 76aeded66f6b2ce'
            }
        }).then((result => result.json().then((data) => {
            if (data.success) {
                if (currentApp == 'Message' || currentApp == 'Business' || currentApp == 'Contact') {
                    cameraFocus = false
                    $("#Camera").removeClass().addClass('Slide-Out-Left')
                    $.post('https://cc_phone/closeCamera', JSON.stringify({}))

                    const date = new Date()

                    const hours = checkTime(date.getHours())
                    const minutes = checkTime(date.getMinutes())
            
                    var MessBar_Time = `${hours}:${minutes}`
                    var MessBar_Type = 'SI'
                    Load_Messaging_Contents(Last_Message_DataId, Last_Message_Id, data.data.link, MessBar_Type, MessBar_Time)
            
                    $.post("https://cc_phone/sendMessage", JSON.stringify({
                        msg: data.data.link,
                        number: This_Messages_Number,
                        type: MessBar_Type,
                        coords: false
                    }))
        
                    Last_Message_Id++
                    Last_Message_DataId++
                    $("#Messaging-Bar-Textbox").val("")

                    setTimeout(() => {
                        var element = document.getElementById("Messaging-Contents")
                        element.scrollTop = element.scrollHeight
                    }, 40)

                    Camera_Shooting = false
                    $("#Camera-Stream").hide()
                } else if (currentApp == 'Whatsapp') {
                    cameraFocus = false
                    $("#Camera").removeClass().addClass('Slide-Out-Left')
                    $.post('https://cc_phone/closeCamera', JSON.stringify({}))

                    const date = new Date()
                
                    const hours = checkTime(date.getHours())
                    const minutes = checkTime(date.getMinutes())
                
                    var MessBar_Time = `${hours}:${minutes}`

                    Load_Whatsapping_Contents(Last_Whatsapp_DataId, Last_Whatsapp_Id, 'Ich', data.data.link, 'SI', MessBar_Time)
                
                    $.post("https://cc_phone/sendGroupMessage", JSON.stringify({
                        groupId: This_Whatsapp_DataId,
                        msg: data.data.link,
                        type: "SI",
                        coords: false
                    }))
                
                    Last_Whatsapp_Id++
                    Last_Whatsapp_DataId++
                
                    setTimeout(function() {
                        $("#Whatsapping-Contents").scrollTop($("#Whatsapping-Contents").prop("scrollHeight"))
                    }, 20)

                    Camera_Shooting = false
                    $("#Camera-Stream").hide()
                } else if (currentApp == 'Settings') {
                    cameraFocus = false
                    $("#Camera").removeClass().addClass('Slide-Out-Left')
                    $.post('https://cc_phone/closeCamera', JSON.stringify({}))

                    $.post('https://cc_phone/setAvatar', JSON.stringify({
                        avatar: data.data.link
                    }))
    
                    $("#Avatar-Avatar-Type").empty()
                    $("#Avatar-Avatar-Type").append(`
                        <div id="Avatar-Avatar-Image" class="Avatar-Image">
                            <img id="Avatar-Avatar-Image-Img" class="Avatar-Image-Img" src="${data.data.link}">
                        </div>
                    `)
    
                    New_Notification("Settings", "Settings", "Info", "Avatar wurde gesetzt!", "Jetzt")
                    
                    Camera_Shooting = false
                    $("#Camera-Stream").hide()
                } else {
                    $("#Camera-Preview-Img").attr('src', data.data.link)
    
                    New_Notification("Camera", "Camera", "Erfolg", "Foto erfolgreich erstellt!")

                    $.post('https://cc_phone/sendPicture', JSON.stringify({
                        link: data.data.link
                    }))

                    Camera_Shooting = false
                }
            } else {
                New_Notification("Camera", "Camera", "Fehler", "Fehler beim erstellen vom Foto!")
                Camera_Shooting = false
            }
        })))
    })
}

$(document).on("click", "#Camera-Shot-Btn", function() {
    if (!Camera_Shooting) {
        Camera_Shooting = true
        takeShoot()
    }
})

$(document).on("click", "#Camera-Top-Field-Back", (Camera_Back = function Camera_Back() {
    if (!Camera_Shooting) {
        if (currentApp == "Camera") {
            currentApp = "Home"
    
            $("#Camera").removeClass().addClass("Hide-App")
            $("#Camera-Stream").show()
            $.post('https://cc_phone/closeCamera', JSON.stringify({}))
        } else {
            cameraFocus = false
            $("#Camera-Stream").hide()
            $("#Camera").removeClass().addClass('Slide-Out-Left')
            $.post('https://cc_phone/closeCamera', JSON.stringify({}))
        }
    }
}))

$(document).on("click", "#Camera-Click-Back", function() {
    Camera_Back()
})

//----------------------------------------------------------------------------------------------------Notes

$(document).on("click", "#M-App-8", function() {
    currentApp = "Notes"

    $.post('https://cc_phone/getNotes', JSON.stringify({
    })).done((notes) => {
        $("#Notes-Textbox").val(notes)
    })

    $("#Notes").addClass("Show-App").removeClass("Hide-App")
})

$(document).on("click", "#Notes-Top-Field-Right", function() {
    const User_Saved_Note = $("#Notes-Textbox").val()

    $.post('https://cc_phone/saveNotes', JSON.stringify({
        notes: User_Saved_Note
    })).done((notify) => {
        New_Notification("Notes", "Notes", "Notiz", notify)
    })
})

$(document).on("click", "#Notes-Top-Field-Back", (Notes_Back = function Notes_Back() {
    currentApp = "Home"

    $("#Notes").removeClass("Show-App").addClass("Hide-App")
}))

$(document).on("click", "#Notes-Click-Back", function() {
    Notes_Back()
})

//----------------------------------------------------------------------------------------------------Calculator

var valueInMemory = null
var operatorInMemory = null

function getCurrentNumber() {
    return $(".Calculator-Value").text().split(',').join('')
}

function getValueAsNumber() {
    return parseFloat(getCurrentNumber())
}

function setValue(value) {
    if (value[value.length - 1] === '.') {
        $(".Calculator-Value").text(`${getCurrentNumber()}.`)
        return
    }

    const args = value.split('.')

    if (args[1]) {
        $(".Calculator-Value").text(parseFloat(args[0]).toLocaleString() + '.' + args[1])
    } else {
        $(".Calculator-Value").text(parseFloat(args[0]).toLocaleString())
    }

    const textLength = getCurrentNumber().length

    if (textLength == '8') {
        $(".Calculator-Value").css("font-size", "4.4vh")
    } else if (textLength >= '9') {
        $(".Calculator-Value").css("font-size", "3.8vh")
    } else {
        $(".Calculator-Value").css("font-size", "5.2vh")
    }
}

function getResult() {
    const currentValueNumber = getValueAsNumber()
    const valueNumInMemory = parseFloat(valueInMemory)
    var newValue

    switch (operatorInMemory) {
        case 'addition':
            newValue = valueNumInMemory + currentValueNumber
        break
        case 'subtraction':
            newValue = valueNumInMemory - currentValueNumber
        break
        case 'multiplication':
            newValue = valueNumInMemory * currentValueNumber
        break
        case 'division':
            newValue = valueNumInMemory / currentValueNumber
        break
    }

    return newValue.toString()
}

$(document).on("click", "#M-App-9", function() {
    currentApp = "Calculator"

    $("#Calculator").addClass("Show-App").removeClass("Hide-App")
})

$(document).on("click", ".Calculator-Container-Button", function() {
    const type = $(this).attr('data-type')
    const current = getCurrentNumber()

    switch (type) {
        case 'function':
            const func = $(this).attr('data-function')

            switch (func) {
                case 'ac':
                    setValue('0')
                    valueInMemory = null
                    operatorInMemory = null
                break
                case 'pm':
                    if (current === '-0') {
                        setValue('0')
                        return
                    }

                    if (getValueAsNumber() >= 0) {
                        setValue(`-${current}`)
                    } else {
                        setValue(current.substring(1))
                    }
                break
                case 'percent':
                    setValue((getValueAsNumber() / 100).toString())
                    valueInMemory = null
                    operatorInMemory = null
                break
            }
        break
        case 'operator':
            const operation = $(this).attr('data-operator')

            if (operation == 'equal') {
                if (valueInMemory) {
                    setValue(getResult())
                    valueInMemory = null
                    operatorInMemory = null
                }
            } else {
                if (!valueInMemory) {
                    valueInMemory = current
                    operatorInMemory = operation
                    setValue('0')
                    return
                }
    
                valueInMemory = current
                operatorInMemory = operation
                setValue('0')
            }
        break
        case 'number':
            const number = $(this).attr('data-number')
            
            if (current === '0') {
                setValue(number)
            } else {
                setValue(current + number)
            }
        break
        case 'decimal':
            const currentValue = getCurrentNumber()

            if (!currentValue.includes(".")) {
                setValue(currentValue + '.')
            }
        break
    }
})

$(document).on("click", "#Calculator-Top-Field-Back", (Calculator_Back = function Calculator_Back() {
    currentApp = "Home"

    $("#Calculator").removeClass("Show-App").addClass("Hide-App")
}))

$(document).on("click", "#Calculator-Click-Back", function() {
    Calculator_Back()
})

//----------------------------------------------------------------------------------------------------Whatsapp

function Load_Whatsapp_Contents(Whats_DataId, Whats_Id, Whats_Name, Whats_Last, Whats_Time, Whats_Avatar, Whats_IsRead) {
    $New_Whats = `
        <div id="Whatsapp-Content-Box-${Whats_Id}" class="Whatsapp-Content-Box" data-Whats_DataId="${Whats_DataId}" data-nickname="${Whats_Name}">
            <div id="Whatsapp-Content-Box-Read-${Whats_Id}" class="Whatsapp-Content-Box-${Whats_IsRead}"></div>
            ${Whats_Avatar == "default" ? `
            <div id="Whatsapp-Content-Box-Avatar-${Whats_Id}" class="Whatsapp-Content-Box-Avatar">
                <svg id="Whatsapp-Content-Box-Avatar-Img-${Whats_Id}" class="Whatsapp-Content-Box-Avatar-Img" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.6vh" height="3vh" viewBox="0 0 26 30">
                    <g fill="var(--Icons-C)" stroke="none" transform="translate(0,30) scale(0.1,-0.1)">
                        <path d="M80 280 c-27 -27 -27 -93 0 -120 30 -30 83 -27 109 6 27 34 27 74 0 108 -26 33 -79 36 -109 6z" />
                        <path d="M32 99 c-19 -13 -32 -28 -30 -38 4 -22 85 -61 128 -61 42 0 118 33 126 54 22 57 -151 91 -224 45z" />
                    </g>
                </svg>
            </div>
            ` : `
            <div id="Whatsapp-Content-Box-Avatar-Image-${Whats_Id}" class="Whatsapp-Content-Box-Avatar-Image">
                <img id="Whatsapp-Content-Box-Avatar-Image-Img-${Whats_Id}" class="Whatsapp-Content-Box-Avatar-Image-Img" src="${Whats_Avatar}">
            </div>
            `
            }
            <div id="Whatsapp-Content-Box-Name-${Whats_Id}" class="Whatsapp-Content-Box-Name">${Whats_Name}</div>
            <div id="Whatsapp-Content-Box-Last-${Whats_Id}" class="Whatsapp-Content-Box-Last">${Whats_Last}</div>
            <div id="Whatsapp-Content-Box-Time-${Whats_Id}" class="Whatsapp-Content-Box-Time">${Whats_Time}</div>
            <svg id="Whatsapp-Content-Box-Icon-${Whats_Id}" Class="Whatsapp-Content-Box-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="1.2vh" height="2vh" viewBox="0 0 476 800">
                <g id="Whatsapp-Content-Box-Img-${Whats_Id}" Class="Whatsapp-Content-Box-Img" transform="translate(0,800) scale(0.1,-0.1)">
                    <path d="M3845 7984 c-99 -22 -203 -68 -282 -124 -43 -31 -683 -664 -1750 -1732 l-1681 -1683 -51 -105 c-110 -230 -110 -450 0 -680 l51 -105 1681 -1683 c925 -926 1710 -1704 1744 -1728 135 -98 264 -138 443 -138 145 0 213 15 335 74 192 93 344 278 400 485 53 198 16 431 -97 608 -29 45 -427 450 -1421 1444 l-1382 1383 1382 1382 c994 995 1392 1400 1421 1445 113 177 150 410 97 608 -69 257 -283 470 -540 540 -88 24 -264 28 -350 9z" />
                </g>
            </svg>

            <div id="Whatsapp-Content-Box-Line-${Whats_Id}" class="Whatsapp-Content-Box-Line"></div>
        </div>

        <div id="Whatsapp-Space-From-Bottom"></div>
    `
    $("#Whatsapp-Space-From-Bottom").remove()
    $("#Whatsapp-Contents").append($New_Whats)
}

function Load_Add_Whatsapp_Contents(Add_Whats_User_DataId, Add_Whats_User_Id, Add_Whats_User_Name, Add_Whats_User_Number, Add_Whats_Avatar) {
    $New_Add_Whats_User = `
        <div id="Add-Whatsapp-User-Box-${Add_Whats_User_Id}" class="Add-Whatsapp-User-Box" data-Add_Whats_User_DataId="${Add_Whats_User_DataId}">
            ${Add_Whats_Avatar == "default" ? `
            <div id="Add-Whatsapp-Content-Box-Avatar-${Add_Whats_User_Id}" class="Add-Whatsapp-Content-Box-Avatar">
                <svg id="Add-Whatsapp-Content-Box-Avatar-Img-${Add_Whats_User_Id}" class="Add-Whatsapp-Content-Box-Avatar-Img" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.6vh" height="3vh" viewBox="0 0 26 30">
                    <g fill="var(--Icons-C)" stroke="none" transform="translate(0,30) scale(0.1,-0.1)">
                        <path d="M80 280 c-27 -27 -27 -93 0 -120 30 -30 83 -27 109 6 27 34 27 74 0 108 -26 33 -79 36 -109 6z"></path>
                        <path d="M32 99 c-19 -13 -32 -28 -30 -38 4 -22 85 -61 128 -61 42 0 118 33 126 54 22 57 -151 91 -224 45z"></path>
                    </g>
                </svg>
            </div>
            ` : `
            <div id="Add-Whatsapp-Content-Box-Avatar-Image-${Add_Whats_User_Id}" class="Add-Whatsapp-Content-Box-Avatar-Image">
                <img id="Add-Whatsapp-Content-Box-Avatar-Image-Img-${Add_Whats_User_Id}" class="Add-Whatsapp-Content-Box-Avatar-Image-Img" src="${Add_Whats_Avatar}">
            </div>
            `
            }

            <div id="Add-Whatsapp-User-Name-${Add_Whats_User_Id}" class="Add-Whatsapp-User-Name">${Add_Whats_User_Name}</div>
            <div id="Add-Whatsapp-User-Number-${Add_Whats_User_Id}" class="Add-Whatsapp-User-Number">${Add_Whats_User_Number}</div>

            <div class="Add-Whatsapp-User-Checkbox">
                <input class="Checkbox Checkbox--shadow" id="Add-Whatsapp-User-Checkbox-${Add_Whats_User_Id}" type="checkbox">
                <label for="Add-Whatsapp-User-Checkbox-${Add_Whats_User_Id}"></label>
            </div>

            <div class="Add-Whatsapp-User-Line"></div>
        </div>
    `

    $("#Add-Whatsapp-Users-Container").append($New_Add_Whats_User)
}

function Load_Whatsapping_Contents(Whatsapping_DataId, Whatsapping_Id, Whatsapping_UserId, Whatsapping_Text, Whatsapping_Type, Whatsapping_Time, x, y) {
    const escapedText = escapeHtml(Whatsapping_Text);
    const escapedUserId = escapeHtml(Whatsapping_UserId);
    const escapedTime = escapeHtml(Whatsapping_Time);
    const escapedId = escapeHtml(Whatsapping_Id);
    const escapedDataId = escapeHtml(Whatsapping_DataId);
    
    var New_Whatsapping = {
        RT: 
        `
            <div id="Whatsapping-Box-${escapedId}" class="Whatsapping-Box" data-Whatsapping_DataId="${escapedDataId}" data-Whatsapping_UserId="${escapedUserId}">
                <div id="Whatsapping-Recive-Txt-${escapedId}" class="Whatsapping-Recive-Txt" data-Whatsapping_Name="${escapedUserId}" data-Whatsapping_Time="${escapedTime}"><div id="Whatsapping-Send-Name-${escapedId}" class="Whatsapping-Send-Name">${escapedUserId}</div>${escapedText}</div>
                    <div id="Whatsapping-Recive-Arrow-${escapedId}" class="Whatsapping-Recive-Arrow">
                        <svg id="Whatsapping-Recive-Arrow-Icon-${escapedId}" Class="Whatsapping-Recive-Arrow-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2vh" height="2.5vh" viewBox="0 0 61 75">
                            <g id="Whatsapping-Recive-Arrow-Img${escapedId}" Class="Whatsapping-Recive-Arrow-Img" transform="translate(0,75) scale(0.1,-0.1)">
                                <path d="M2 528 l3 -223 34 -62 c39 -73 117 -151 187 -186 87 -44 149 -57 271 -57 118 0 133 7 68 34 -48 20 -107 78 -133 130 -34 67 -42 139 -42 374 l0 212 -196 0 -195 0 3 -222z" />
                            </g>
                    </svg>
                </div>
            </div>

            <div id="Whatsapping-Space-From-Bottom"></div>
        `,
        ST:
        `
            <div id="Whatsapping-Box-${escapedId}" class="Whatsapping-Box" data-Whatsapping_DataId="${escapedDataId}" data-Whatsapping_UserId="${escapedUserId}">
                <div id="Whatsapping-Send-Txt-${escapedId}" class="Whatsapping-Send-Txt" data-Whatsapping_Name="${escapedUserId}" data-Whatsapping_Time="${escapedTime}">
                <div id="Whatsapping-Send-Name-${escapedId}" class="Whatsapping-Send-Name">${escapedUserId}</div>
                ${escapedText}
                </div>
                
                <div id="Whatsapping-Send-Arrow-${escapedId}" class="Whatsapping-Send-Arrow">
                    <svg id="Whatsapping-Send-Arrow-Icon-${escapedId}" Class="Whatsapping-Send-Arrow-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2vh" height="2.5vh" viewBox="0 0 61 75">
                        <g id="Whatsapping-Send-Arrow-Img${escapedId}" Class="Whatsapping-Send-Arrow-Img" transform="translate(0,75) scale(0.1,-0.1)">
                            <path d="M2 528 l3 -223 34 -62 c39 -73 117 -151 187 -186 87 -44 149 -57 271 -57 118 0 133 7 68 34 -48 20 -107 78 -133 130 -34 67 -42 139 -42 374 l0 212 -196 0 -195 0 3 -222z" />
                        </g>
                    </svg>
                </div>
            </div>

            <div id="Whatsapping-Space-From-Bottom"></div>
        `,
        RL:
        `
            <div id="Whatsapping-Box-${escapedId}" class="Whatsapping-Box" data-Whatsapping_DataId="${escapedDataId}" data-Whatsapping_UserId="${escapedUserId}" data-x="${escapeHtml(x)}" data-y="${escapeHtml(y)}">
                <div id="Whatsapping-Recive-Txt-${escapedId}" class="Whatsapping-Recive-Txt" data-Whatsapping_Name="${escapedUserId}" data-Whatsapping_Time="${escapedTime}"><div id="Whatsapping-Send-Name-${escapedId}" class="Whatsapping-Send-Name">${escapedUserId}</div>Location: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>

            <div id="Whatsapping-Recive-Loc-Address-${escapedId}" class="Whatsapping-Recive-Loc-Address">${escapedText}</div>
                <div id="Whatsapping-Recive-Loc-${escapedId}" class="Whatsapping-Recive-Loc">
                    <svg id="Whatsapping-Recive-Loc-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.4vh" height="4vh" viewBox="0 0 586 978">
                        <g id="Whatsapping-Recive-Loc-Img" transform="translate(0,978) scale(0.1,-0.1)">
                            <path d="M2765 9768 c-573 -26 -1154 -239 -1620 -591 -746 -565 -1172 -1453 -1142 -2382 10 -296 72 -627 170 -906 26 -75 557 -1215 1397 -3005 745 -1586 1357 -2883 1360 -2883 5 0 2627 5574 2699 5737 199 451 275 1036 201 1547 -134 922 -699 1720 -1521 2149 -484 253 -982 361 -1544 334z m426 -1791 c364 -95 648 -384 741 -753 32 -128 32 -360 0 -488 -79 -314 -306 -581 -599 -706 -135 -57 -230 -74 -403 -74 -173 0 -268 17 -403 74 -233 100 -442 307 -542 538 -61 140 -79 236 -79 412 0 172 17 269 73 401 113 270 374 505 646 584 179 53 393 57 566 12z" />
                        </g>
                    </svg>
                </div>
                
                <div id="Whatsapping-Recive-Arrow-${escapedId}" class="Whatsapping-Recive-Arrow">
                    <svg id="Whatsapping-Recive-Arrow-Icon-${escapedId}" Class="Whatsapping-Recive-Arrow-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2vh" height="2.5vh" viewBox="0 0 61 75">
                        <g id="Whatsapping-Recive-Arrow-Img${escapedId}" Class="Whatsapping-Recive-Arrow-Img" transform="translate(0,75) scale(0.1,-0.1)">
                            <path d="M2 528 l3 -223 34 -62 c39 -73 117 -151 187 -186 87 -44 149 -57 271 -57 118 0 133 7 68 34 -48 20 -107 78 -133 130 -34 67 -42 139 -42 374 l0 212 -196 0 -195 0 3 -222z" />
                        </g>
                    </svg>
                </div>
            </div>

            <div id="Whatsapping-Space-From-Bottom"></div>
        `,
        SL:
        `
            <div id="Whatsapping-Box-${escapedId}" class="Whatsapping-Box" data-Whatsapping_DataId="${escapedDataId}" data-Whatsapping_UserId="${escapedUserId}" data-x="${escapeHtml(x)}" data-y="${escapeHtml(y)}">
                <div id="Whatsapping-Send-Txt-${escapedId}" class="Whatsapping-Send-Txt" data-Whatsapping_Name="${escapedUserId}" data-Whatsapping_Time="${escapedTime}"><div id="Whatsapping-Send-Name-${escapedId}" class="Whatsapping-Send-Name">${escapedUserId}</div>Location: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div id="Whatsapping-Send-Loc-Address-${escapedId}" class="Whatsapping-Send-Loc-Address">${escapedText}</div>
                <div id="Whatsapping-Send-Loc-${escapedId}" class="Whatsapping-Send-Loc">
                    <svg id="Whatsapping-Send-Loc-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.4vh" height="4vh" viewBox="0 0 586 978">
                        <g id="Whatsapping-Send-Loc-Img" transform="translate(0,978) scale(0.1,-0.1)">
                            <path d="M2765 9768 c-573 -26 -1154 -239 -1620 -591 -746 -565 -1172 -1453 -1142 -2382 10 -296 72 -627 170 -906 26 -75 557 -1215 1397 -3005 745 -1586 1357 -2883 1360 -2883 5 0 2627 5574 2699 5737 199 451 275 1036 201 1547 -134 922 -699 1720 -1521 2149 -484 253 -982 361 -1544 334z m426 -1791 c364 -95 648 -384 741 -753 32 -128 32 -360 0 -488 -79 -314 -306 -581 -599 -706 -135 -57 -230 -74 -403 -74 -173 0 -268 17 -403 74 -233 100 -442 307 -542 538 -61 140 -79 236 -79 412 0 172 17 269 73 401 113 270 374 505 646 584 179 53 393 57 566 12z" />
                        </g>
                    </svg>
                </div>

                <div id="Whatsapping-Send-Arrow-${escapedId}" class="Whatsapping-Send-Arrow">
                    <svg id="Whatsapping-Send-Arrow-Icon-${escapedId}" Class="Whatsapping-Send-Arrow-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2vh" height="2.5vh" viewBox="0 0 61 75">
                        <g id="Whatsapping-Send-Arrow-Img${escapedId}" Class="Whatsapping-Send-Arrow-Img" transform="translate(0,75) scale(0.1,-0.1)">
                            <path d="M2 528 l3 -223 34 -62 c39 -73 117 -151 187 -186 87 -44 149 -57 271 -57 118 0 133 7 68 34 -48 20 -107 78 -133 130 -34 67 -42 139 -42 374 l0 212 -196 0 -195 0 3 -222z" />
                        </g>
                    </svg>
                </div>
            </div>

            <div id="Whatsapping-Space-From-Bottom"></div>
        `,
        RI:
        `
            <div id="Whatsapping-Box-${escapedId}" class="Whatsapping-Box" data-Whatsapping_DataId="${escapedDataId}" data-Whatsapping_UserId="${escapedUserId}">
                <div class="Whatsapping-Recive-Icon" data-Whatsapping_Name="${escapedUserId}" data-Whatsapping_Time="${escapedTime}">
                    <div id="Whatsapping-Send-Name-${escapedId}" class="Whatsapping-Send-Name">${escapedUserId}</div>
                    <img class="Whatsapping-Recive-Img" src="${escapeHtml(Whatsapping_Text)}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y4ZjhmOCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgRXJyb3I8L3RleHQ+PC9zdmc+'">
                </div>

                <div id="Whatsapping-Recive-Arrow-${escapedId}" class="Whatsapping-Recive-Arrow">
                    <svg id="Whatsapping-Recive-Arrow-Icon-${escapedId}" Class="Whatsapping-Recive-Arrow-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2vh" height="2.5vh" viewBox="0 0 61 75">
                        <g id="Whatsapping-Recive-Arrow-Img${escapedId}" Class="Whatsapping-Recive-Arrow-Img" transform="translate(0,75) scale(0.1,-0.1)">
                            <path d="M2 528 l3 -223 34 -62 c39 -73 117 -151 187 -186 87 -44 149 -57 271 -57 118 0 133 7 68 34 -48 20 -107 78 -133 130 -34 67 -42 139 -42 374 l0 212 -196 0 -195 0 3 -222z" />
                        </g>
                    </svg>
                </div>
            </div>

            <div id="Whatsapping-Space-From-Bottom"></div>
        `,
        SI:
        `
            <div id="Whatsapping-Box-${escapedId}" class="Whatsapping-Box" data-Whatsapping_DataId="${escapedDataId}" data-Whatsapping_UserId="${escapedUserId}">
                <div class="Whatsapping-Send-Icon" data-Whatsapping_Name="${escapedUserId}" data-Whatsapping_Time="${escapedTime}">
                    <div id="Whatsapping-Send-Name-${escapedId}" class="Whatsapping-Send-Name">${escapedUserId}</div>    
                    <img class="Whatsapping-Send-Img" src="${escapeHtml(Whatsapping_Text)}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y4ZjhmOCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgRXJyb3I8L3RleHQ+PC9zdmc+'">
                </div>

                <div id="Whatsapping-Send-Arrow-${escapedId}" class="Whatsapping-Send-Arrow">
                    <svg id="Whatsapping-Send-Arrow-Icon-${escapedId}" Class="Whatsapping-Send-Arrow-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2vh" height="2.5vh" viewBox="0 0 61 75">
                        <g id="Whatsapping-Send-Arrow-Img${escapedId}" Class="Whatsapping-Send-Arrow-Img" transform="translate(0,75) scale(0.1,-0.1)">
                            <path d="M2 528 l3 -223 34 -62 c39 -73 117 -151 187 -186 87 -44 149 -57 271 -57 118 0 133 7 68 34 -48 20 -107 78 -133 130 -34 67 -42 139 -42 374 l0 212 -196 0 -195 0 3 -222z" />
                        </g>
                    </svg>
                </div>
            </div>

            <div id="Whatsapping-Space-From-Bottom"></div>
        `,
    }

    $("#Whatsapping-Space-From-Bottom").remove()

    switch (Whatsapping_Type) {
        case 'RT':
            $("#Whatsapping-Contents").append(New_Whatsapping.RT)
        break
        case 'ST':
            $("#Whatsapping-Contents").append(New_Whatsapping.ST)
        break
        case 'RL':
            $("#Whatsapping-Contents").append(New_Whatsapping.RL)
        break
        case 'SL':
            $("#Whatsapping-Contents").append(New_Whatsapping.SL)
        break
        case 'RI':
            $("#Whatsapping-Contents").append(New_Whatsapping.RI)
        break
        case 'SI':
            $("#Whatsapping-Contents").append(New_Whatsapping.SI)
        break
    }
}

function Load_Edit_Whatsapp_Contents(Edit_Whats_User_DataId, Edit_Whats_User_Id, Edit_Whats_User_Name, Edit_Whats_User_Number, Edit_Whats_Avatar, Edit_Whats_User_Perm) {
    const escapedDataId = escapeHtml(Edit_Whats_User_DataId);
    const escapedId = escapeHtml(Edit_Whats_User_Id);
    const escapedName = escapeHtml(Edit_Whats_User_Name);
    const escapedNumber = escapeHtml(Edit_Whats_User_Number);
    const escapedAvatar = escapeHtml(Edit_Whats_Avatar);
    const escapedPerm = escapeHtml(Edit_Whats_User_Perm);
    
    const newUserContent = `
        <div id="Edit-Whatsapp-User-Box-${escapedId}" class="Edit-Whatsapp-User-Box" data-Edit_Whats_User_DataId="${escapedDataId}" data-Edit_Whats_User_Perm="${escapedPerm}">
            ${Edit_Whats_Avatar == "default" ? `
            <div id="Edit-Whatsapp-Content-Box-Avatar-${escapedId}" class="Edit-Whatsapp-Content-Box-Avatar">
                <svg id="Edit-Whatsapp-Content-Box-Avatar-Img-${escapedId}" class="Edit-Whatsapp-Content-Box-Avatar-Img" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.6vh" height="3vh" viewBox="0 0 26 30">
                    <g fill="var(--Icons-C)" stroke="none" transform="translate(0,30) scale(0.1,-0.1)">
                        <path d="M80 280 c-27 -27 -27 -93 0 -120 30 -30 83 -27 109 6 27 34 27 74 0 108 -26 33 -79 36 -109 6z"></path>
                        <path d="M32 99 c-19 -13 -32 -28 -30 -38 4 -22 85 -61 128 -61 42 0 118 33 126 54 22 57 -151 91 -224 45z"></path>
                    </g>
                </svg>
            </div>
            ` : `
            <div id="Edit-Whatsapp-Content-Box-Avatar-Image-${escapedId}" class="Edit-Whatsapp-Content-Box-Avatar-Image">
                <img id="Edit-Whatsapp-Content-Box-Avatar-Image-Img-${escapedId}" class="Edit-Whatsapp-Content-Box-Avatar-Image-Img" src="${escapedAvatar}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y4ZjhmOCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgRXJyb3I8L3RleHQ+PC9zdmc+'">
            </div>
            `
            }

            <div class="Edit-Whatsapp-User-Texts">
                <div id="Edit-Whatsapp-User-Name-${escapedId}" class="Edit-Whatsapp-User-Name">${escapedName}</div>
                    <div class="Edit-Whatsapp-User-Star-Icon">
                        <svg class="Edit-Whatsapp-User-Star-Img" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <g transform="translate(0,512) scale(0.1,-0.1)" >
                                <path class="Edit-Whatsapp-User-Star-Img-Inner" xmlns="http://www.w3.org/2000/svg" d="M2475 4581 c-22 -10 -52 -31 -67 -47 -15 -16 -152 -281 -304 -589 -152 -308 -278 -561 -279 -563 -2 -2 -279 -44 -616 -93 -513 -75 -622 -94 -665 -115 -67 -32 -106 -88 -112 -162 -9 -105 -13 -100 466 -565 240 -234 445 -433 455 -444 17 -20 14 -42 -92 -645 -77 -437 -109 -635 -104 -662 9 -56 60 -126 113 -154 37 -19 56 -23 105 -20 56 4 94 22 617 296 307 161 562 292 569 292 6 0 261 -131 566 -291 347 -182 570 -293 594 -296 117 -16 239 87 239 201 0 21 -47 307 -105 635 -58 328 -104 605 -103 617 2 12 190 202 460 463 379 367 460 450 474 487 23 60 15 132 -20 182 -54 78 -47 76 -738 177 -346 51 -630 94 -632 96 -2 2 -128 256 -280 564 -152 308 -289 573 -304 589 -37 39 -98 66 -152 66 -25 0 -63 -9 -85 -19z" />
                                <path class="Edit-Whatsapp-User-Star-Img-Outer" xmlns="http://www.w3.org/2000/svg" d="M2475 4581 c-22 -10 -52 -31 -67 -47 -15 -16 -152 -281 -304 -589 -152 -308 -278 -561 -279 -563 -2 -2 -279 -44 -616 -93 -513 -75 -622 -94 -665 -115 -67 -32 -106 -88 -112 -162 -9 -105 -13 -100 466 -565 240 -234 445 -433 455 -444 17 -20 14 -42 -92 -645 -77 -437 -109 -635 -104 -662 9 -56 60 -126 113 -154 37 -19 56 -23 105 -20 56 4 94 22 617 296 307 161 562 292 569 292 6 0 261 -131 566 -291 347 -182 570 -293 594 -296 117 -16 239 87 239 201 0 21 -47 307 -105 635 -58 328 -104 605 -103 617 2 12 190 202 460 463 379 367 460 450 474 487 23 60 15 132 -20 182 -54 78 -47 76 -738 177 -346 51 -630 94 -632 96 -2 2 -128 256 -280 564 -152 308 -289 573 -304 589 -37 39 -98 66 -152 66 -25 0 -63 -9 -85 -19z m281 -1088 c104 -212 201 -405 216 -429 52 -82 61 -85 566 -158 249 -36 458 -66 465 -66 6 0 -142 -154 -330 -342 -356 -358 -364 -368 -362 -448 0 -14 35 -226 77 -472 l78 -446 -46 23 c-25 12 -207 109 -405 214 -197 106 -378 196 -401 201 -80 18 -59 27 -556 -237 -199 -106 -353 -181 -359 -177 -7 4 -9 3 -5 -4 3 -6 2 -13 -4 -17 -5 -3 -10 0 -10 7 0 7 34 210 75 450 41 240 75 452 75 470 -1 76 -30 112 -368 451 -180 180 -327 327 -326 327 26 0 910 134 933 141 73 24 96 62 296 492 104 224 192 407 196 407 3 0 91 -174 195 -387z" />
                            </g>
                        </svg>
                    </div>
                </div>
                
                <div id="Edit-Whatsapp-User-Info-${escapedId}" class="Edit-Whatsapp-User-Info">${escapedNumber}</div>
                    <div class="Edit-Whatsapp-User-More">
                        <svg class="Edit-Whatsapp-User-More-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="1.2vh" height="2vh" viewBox="0 0 476 800">
                            <g class="Edit-Whatsapp-User-More-Img" transform="translate(0,800) scale(0.1,-0.1)">
                                <path d="M3845 7984 c-99 -22 -203 -68 -282 -124 -43 -31 -683 -664 -1750 -1732 l-1681 -1683 -51 -105 c-110 -230 -110 -450 0 -680 l51 -105 1681 -1683 c925 -926 1710 -1704 1744 -1728 135 -98 264 -138 443 -138 145 0 213 15 335 74 192 93 344 278 400 485 53 198 16 431 -97 608 -29 45 -427 450 -1421 1444 l-1382 1383 1382 1382 c994 995 1392 1400 1421 1445 113 177 150 410 97 608 -69 257 -283 470 -540 540 -88 24 -264 28 -350 9z"></path>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>

            <div class="Edit-Whatsapp-User-Line"></div>
        </div>
    `
    $("#Edit-Whatsapp-Users-Container").append(newUserContent)
}

function Load_Edit_Whatsapp_AddUsers_Contents(Edit_Whats_AddUser_DataId, Edit_Whats_AddUser_Id, Edit_Whats_AddUser_Name, Edit_Whats_AddUser_Number, Edit_Whats_AddUser_Avatar) {
    const addUserContent = `
        <div id="Edit-Whatsapp-AddUser-Box-${Edit_Whats_AddUser_Id}" class="Edit-Whatsapp-AddUser-Box" data-Edit_Whats_AddUser_DataId="${Edit_Whats_AddUser_DataId}">
            ${Edit_Whats_AddUser_Avatar == "default" ? `
            <div id="Add-Whatsapp-Content-Box-Avatar-${Edit_Whats_AddUser_Id}" class="Add-Whatsapp-Content-Box-Avatar">
                <svg id="Add-Whatsapp-Content-Box-Avatar-Img-${Edit_Whats_AddUser_Id}" class="Add-Whatsapp-Content-Box-Avatar-Img" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.6vh" height="3vh" viewBox="0 0 26 30">
                    <g fill="var(--Icons-C)" stroke="none" transform="translate(0,30) scale(0.1,-0.1)">
                        <path d="M80 280 c-27 -27 -27 -93 0 -120 30 -30 83 -27 109 6 27 34 27 74 0 108 -26 33 -79 36 -109 6z"></path>
                        <path d="M32 99 c-19 -13 -32 -28 -30 -38 4 -22 85 -61 128 -61 42 0 118 33 126 54 22 57 -151 91 -224 45z"></path>
                    </g>
                </svg>
            </div>
            ` : `
            <div id="Add-Whatsapp-Content-Box-Avatar-Image-${Edit_Whats_AddUser_Id}" class="Add-Whatsapp-Content-Box-Avatar-Image">
                <img id="Add-Whatsapp-Content-Box-Avatar-Image-Img-${Edit_Whats_AddUser_Id}" class="Add-Whatsapp-Content-Box-Avatar-Image-Img" src="${Edit_Whats_AddUser_Avatar}">
            </div>
            `
            }

            <div id="Edit-Whatsapp-AddUser-Name-${Edit_Whats_AddUser_Id}" class="Edit-Whatsapp-AddUser-Name">${Edit_Whats_AddUser_Name}</div>
            <div id="Edit-Whatsapp-AddUser-Number-${Edit_Whats_AddUser_Id}" class="Edit-Whatsapp-AddUser-Number">${Edit_Whats_AddUser_Number}</div>

            <div class="Edit-Whatsapp-AddUser-Checkbox">
                <input class="Checkbox Checkbox--shadow" id="Edit-Whatsapp-AddUser-Checkbox-${Edit_Whats_AddUser_Id}" type="checkbox">
                <label for="Edit-Whatsapp-AddUser-Checkbox-${Edit_Whats_AddUser_Id}"></label>
            </div>

            <div class="Edit-Whatsapp-AddUser-Line"></div>
        </div>

        <div id="Edit-Whatsapp-AddUser-Box-Confirm" class="Edit-Whatsapp-AddUser-Box">
            <div class="Edit-Whatsapp-Action-Title Clr-A">Hinzufügen</div>
        </div>
    `

    $("#Edit-Whatsapp-AddUser-Box-Confirm").remove()
    $("#Edit-Whatsapp-AddUsers-Container").append(addUserContent)
}

$(document).on('keyup', '#Whatsapp-Search-Bar-Textbox', function() {
    const inputText = $(this).val()

    $(".Whatsapp-Content-Box").each(function() {
        const get = $(this).attr("data-nickname")

        if (get == undefined) {
            return
        }

        if (!get.includes(inputText)) {
            $(this).hide()
        } else {
            $(this).show()
        }
    })
})

$(document).on("click", "#Whatsapp-Top-Field-Right", function() {
    $("#Add-Whatsapp-Textbox").val("")
    $(".Add-Whatsapp-User-Box").remove()

    $.post("https://cc_phone/getContacts").done((contacts) => {
        test = []

        contacts.forEach((contact, index) => {
            test.push({
                index: index,
                id: contact.id,
                name: contact.name,
                number: contact.number,
                favorite: contact.favorite,
                delete: contact.delete,
                avatar: contact.avatar
            })
        })

        test.sort(function(a, b) {
            var a1 = typeof a.name, b1 = typeof b.name
            return a1 < b1 ? -1 : a1 > b1 ? 1 : a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        })

        test.forEach((contact) => {
            Load_Add_Whatsapp_Contents(contact.id, contact.index, contact.name, contact.number, contact.avatar)
        })
    })

    $("#Add-Whatsapp").removeClass().addClass("Show-Add-Whatsapp")
})

function Load_Whatsapping_TopField(WhatsappTop_DataId, WhatsappTop_Avatar, WhatsappTop_Name, WhatsappTop_Not) {
    $(".Whatsapping-Top-Field-Avatar-Container").empty()
    
    if (WhatsappTop_Avatar == 'default') {
        $(".Whatsapping-Top-Field-Avatar-Container").append(`
            <div id="Whatsapping-Top-Field-Avatar" class="Top-Field-Avatar">
                <svg id="Whatsapping-Top-Field-Avatar-Img-1" class="Top-Field-Avatar-Img" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.6vh" height="3vh" viewBox="0 0 26 30">
                    <g fill="var(--Icons-C)" stroke="none" transform="translate(0,30) scale(0.1,-0.1)">
                        <path d="M80 280 c-27 -27 -27 -93 0 -120 30 -30 83 -27 109 6 27 34 27 74 0 108 -26 33 -79 36 -109 6z"></path>
                        <path d="M32 99 c-19 -13 -32 -28 -30 -38 4 -22 85 -61 128 -61 42 0 118 33 126 54 22 57 -151 91 -224 45z"></path>
                    </g>
                </svg>
            </div>
        `)
    } else {
        $(".Whatsapping-Top-Field-Avatar-Container").append(`
            <div id="Whatsapping-Top-Field-Avatar-Image-${WhatsappTop_DataId}" class="Whatsapping-Top-Field-Avatar-Image">
                <img id="Whatsapping-Top-Field-Avatar-Image-Img-${WhatsappTop_DataId}" class="Whatsapping-Top-Field-Avatar-Image-Img" src="${WhatsappTop_Avatar}">
            </div>
        `)
    }

    $("#Whatsapping-Title").text(WhatsappTop_Name)
    $("#Whatsapping-Top-Field-Back-Text").text(WhatsappTop_Not)
    $("#Whatsapping-Top-Field").attr('data-WhatsTop_DataId', WhatsappTop_DataId)

    if (WhatsappTop_Not == "0") {
        $("#Whatsapping-Top-Field-Back-Text").css("display", "none")
    } else {
        $("#Whatsapping-Top-Field-Back-Text").css("display", "flex")
    }
}

$(document).on("click", "#Whatsapping-Top-Field-Back", function() {
    $("#Whatsapping").removeClass().addClass("Hide-Whatsapping")
    isInGroupChat = false
    Load_Whatsapp()
})

$(document).on("click", "#Add-Whatsapp-Click-Back", function() {
    $("#Add-Whatsapp").removeClass().addClass("Hide-Add-Whatsapp")
    $("#Whatsapp").removeClass("Show-App").addClass("Hide-App")
    $("#Whatsapping").removeClass()
})

$(document).on("click", "#Whatsapping-Click-Back", function() {
    $("#Add-Whatsapp").removeClass().addClass("Hide-Add-Whatsapp")
    $("#Whatsapping").removeClass()
    $("#Whatsapp").removeClass("Show-App").addClass("Hide-App")
})

$("#Whatsapping-Bar-Textbox").keypress(function(event) {
    const keycode = event.keyCode ? event.keyCode : event.which

    if (keycode == "13") {
        var MessBar_Text = $("#Whatsapping-Bar-Textbox").val()
        const date = new Date()

        const hours = checkTime(date.getHours())
        const minutes = checkTime(date.getMinutes())

        var MessBar_Time = `${hours}:${minutes}`
        var MessBar_Type = "ST"

        if (!MessBar_Text == "") {
            Load_Whatsapping_Contents(Last_Whatsapp_DataId, Last_Whatsapp_Id, 'Ich', MessBar_Text, MessBar_Type, MessBar_Time)

            $.post("https://cc_phone/sendGroupMessage", JSON.stringify({
                groupId: This_Whatsapp_DataId,
                msg: MessBar_Text,
                type: "ST",
                coords: false
            }))

            Last_Whatsapp_Id++
            Last_Whatsapp_DataId++
            $("#Whatsapping-Bar-Textbox").val("")

            setTimeout(function() {
                $("#Whatsapping-Contents").scrollTop($("#Whatsapping-Contents").prop("scrollHeight"))
            }, 20)
        }
    }
})

$(document).on("click", "#Whatsapping-Bar-Location", function() {
    var location_now = "My_Location_Now"
    const date = new Date()

    const hours = checkTime(date.getHours())
    const minutes = checkTime(date.getMinutes())

    var MessBar_Time = `${hours}:${minutes}`
    
    $.post('https://cc_phone/getCoords', JSON.stringify({ 
    })).done((data) => {
        Load_Whatsapping_Contents(Last_Whatsapp_DataId, Last_Whatsapp_Id, 'Ich', location_now, 'SL', MessBar_Time, data.x, data.y)
    })

    $.post("https://cc_phone/sendGroupMessage", JSON.stringify({
        groupId: This_Whatsapp_DataId,
        msg: "Standort",
        type: "SL",
        coords: true
    }))

    Last_Whatsapp_Id++
    Last_Whatsapp_DataId++

    setTimeout(function() {
        $("#Whatsapping-Contents").scrollTop($("#Whatsapping-Contents").prop("scrollHeight"))
    }, 20)
})

$(document).on("click", "#Whatsapping-Bar-Camera", function() {
    cameraFocus = true
    $("#Camera-Stream").show()
    $.post('https://cc_phone/openCamera', JSON.stringify({}))
    $("#Camera").attr("data-OpenAppMode", "true")
    $("#Camera").removeClass().addClass('Slide-In-Left')
})

$(document).on("click", ".Whatsapp-Content-Box", (load_Whatsapping = function() {
    This_Whatsapp_Box = "#" + $(this).attr("id")
    This_Whatsapp_Id = This_Whatsapp_Box.split("-").pop()
    This_Whatsapp_Group = $("#Whatsapp-Content-Box-Name-" + This_Whatsapp_Id).text()
    This_Whatsapp_DataId = $(this).attr("data-Whats_DataId")
    var All_UnRead_Whatsapp = 0
    Last_Whatsapp_Id = 1
    Last_Whatsapp_DataId = 6
    This_Whatsapp_UserId = "User"

    isInGroupChat = true

    $(".Whatsapping-Box").remove()
    $("#Whatsapping-Space-From-Top").remove()
    $("#Whatsapping-Contents").append('<div id="Whatsapping-Space-From-Top"></div>')

    $.post('https://cc_phone/getGroupChat', JSON.stringify({
        groupId: This_Whatsapp_DataId
    })).done((data) => {
        $("#Whatsapping-Top-Field-Right").show()

        Load_Whatsapping_TopField(This_Whatsapp_DataId, data.avatar, This_Whatsapp_Group, All_UnRead_Whatsapp.toString())

        This_Member_Perm = data.permission

        data.messages.forEach((message, index) => {
            const date = new Date(message.date * 1000)

            const hours = checkTime(date.getHours())
            const minutes = checkTime(date.getMinutes())

            if (message.coords) {
                if (message.coords[0] && message.coords[1]) {
                    Load_Whatsapping_Contents(Last_Whatsapp_DataId, Last_Whatsapp_Id, message.author, 'Location: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', message.type, `${hours}:${minutes}`, message.coords[0], message.coords[1])
                    Last_Whatsapp_Id++
                    Last_Whatsapp_DataId++
                    return
                }
            }

            Load_Whatsapping_Contents(Last_Whatsapp_DataId, Last_Whatsapp_Id, message.author, message.msg, message.type, `${hours}:${minutes}`, "X", "Y")
            Last_Whatsapp_Id++
            Last_Whatsapp_DataId++
        })

        setTimeout(function() {
            $("#Whatsapping-Contents").scrollTop($("#Whatsapping-Contents").prop("scrollHeight"))
        }, 20)
    })

    setTimeout(function() {
        $("#Whatsapping-Contents").scrollTop($("#Whatsapping-Contents").prop("scrollHeight"))
    }, 20)

    $("#Whatsapping").removeClass().addClass("Show-Whatsapping")
}))

$(document).on("click", "#Add-Whatsapp-Top-Field-Back", function() {
    $("#Add-Whatsapp").removeClass().addClass("Hide-Add-Whatsapp")
})

function Load_Edit_Whatsapp_TopField(Edit_WhatsappTop_Name, Edit_WhatsappTop_Avatar, Edit_WhatsappTop_Members, This_Member_Perm) {
    $(".Edit-Whatsapp-Avatar-Container").empty()
    
    if (Edit_WhatsappTop_Avatar == 'default') {
        $(".Edit-Whatsapp-Avatar-Container").append(`
            <div id="Edit-Whatsapp-Avatar" class="Top-Field-Avatar">
                <svg id="Edit-Whatsapp-Avatar-Img" class="Top-Field-Avatar-Img" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.6vh" height="3vh" viewBox="0 0 26 30">
                    <g fill="var(--Icons-C)" stroke="none" transform="translate(0,30) scale(0.1,-0.1)">
                        <path d="M80 280 c-27 -27 -27 -93 0 -120 30 -30 83 -27 109 6 27 34 27 74 0 108 -26 33 -79 36 -109 6z"></path>
                        <path d="M32 99 c-19 -13 -32 -28 -30 -38 4 -22 85 -61 128 -61 42 0 118 33 126 54 22 57 -151 91 -224 45z"></path>
                    </g>
                </svg>
            </div>
        `)
    } else {
        $(".Edit-Whatsapp-Avatar-Container").append(`
            <div id="Edit-Whatsapp-Avatar-Image-${Edit_WhatsappTop_Name}" class="Edit-Whatsapp-Avatar-Image">
                <img id="Edit-Whatsapp-Avatar-Image-Img-${Edit_WhatsappTop_Name}" class="Edit-Whatsapp-Avatar-Image-Img" src="${Edit_WhatsappTop_Avatar}">
            </div>
        `)
    }

    $("#Edit-Whatsapp-Name").text(Edit_WhatsappTop_Name)
    $("#Edit-Whatsapp-Number").text(Edit_WhatsappTop_Members)
    $("#Edit-Whatsapp").attr("data-IsAdmin", This_Member_Perm)
    $("#Edit-Whatsapp-Option-Content").attr("data-IsAdmin", This_Member_Perm)
}

$(document).on("click", "#Edit-Whatsapp-Action-Add", function() {
    if (!This_Whatsapp_Add_Members) {
        This_Whatsapp_Add_Members = true
    
        $(".Edit-Whatsapp-AddUser-Box").remove()

        $.post("https://cc_phone/getContacts").done((contacts) => {
            test = []

            contacts.forEach((contact, index) => {
                test.push({
                    index: index,
                    id: contact.id,
                    name: contact.name,
                    number: contact.number,
                    favorite: contact.favorite,
                    delete: contact.delete,
                    avatar: contact.avatar
                })
            })
    
            test.sort(function(a, b) {
                var a1 = typeof a.name, b1 = typeof b.name
                return a1 < b1 ? -1 : a1 > b1 ? 1 : a.name < b.name ? -1 : a.name > b.name ? 1 : 0
            })
    
            test.forEach((contact) => {
                Load_Edit_Whatsapp_AddUsers_Contents(contact.id, contact.index, contact.name, contact.number, contact.avatar)
            })
        })
    
        $("#Edit-Whatsapp-AddUsers-Container").removeClass("AddUsers-Hide").addClass("AddUsers-Show")
    } else {
        This_Whatsapp_Add_Members = false
    
        $(".Edit-Whatsapp-AddUser-Box").remove()
    
        $("#Edit-Whatsapp-AddUsers-Container").removeClass("AddUsers-Show").addClass("AddUsers-Hide")
    }
})

$(document).on("click", "#Edit-Whatsapp-AddUser-Box-Confirm", function() {
    $("#Edit-Whatsapp-AddUsers-Container").removeClass("AddUsers-Show").addClass("AddUsers-Hide")
    var found = false
    var members = []
    
    $('.Edit-Whatsapp-AddUser-Box .Checkbox:checkbox:checked').each(function(index, obj) {
        if ($.isEmptyObject(obj)) {
            found = false
        } else {
            found = true
            var This_Checked_Edit_Whatsapp_AddUser_Box = $(obj).parent().parent()
            var This_Checked_Edit_Whatsapp_AddUser_Name = This_Checked_Edit_Whatsapp_AddUser_Box.find(".Edit-Whatsapp-AddUser-Name").text()
            var This_Checked_Edit_Whatsapp_AddUser_Number = This_Checked_Edit_Whatsapp_AddUser_Box.find(".Edit-Whatsapp-AddUser-Number").text()

            members.push({
                number: This_Checked_Edit_Whatsapp_AddUser_Number,
                permission: 0
            })
        }
    })

    if (found) {
        $.post('https://cc_phone/addGroupMember', JSON.stringify({
            groupId: This_Whatsapp_DataId,
            members: members
        })).done((data) => {
            This_Whatsapp_Add_Members = false
            setTimeout(() => {
                Load_Edit_Whatsapp()  
            }, 300)
        })
    } else {
        New_Notification("Whatsapp", "Whatsapp", "Warnning!", "Please Choose Atleast a member", "Now")
    }
})

$(document).on("click", "#Whatsapping-Top-Field-Right", (Load_Edit_Whatsapp = function Load_Edit_Whatsapp() {
    $("#Edit-Whatsapp").removeClass().addClass("Show-Edit-Whatsapp")

    $.post('https://cc_phone/getGroupData', JSON.stringify({
        groupId: This_Whatsapp_DataId
    })).done((groupData) => {
        var The_Number_of_Members = groupData.members.length
        Load_Edit_Whatsapp_TopField(groupData.name, groupData.avatar, The_Number_of_Members, This_Member_Perm)
        $(".Edit-Whatsapp-User-Box").remove()

        const sortedGroupMembers = []

        groupData.members.forEach((member, index) => {
            sortedGroupMembers.push({
                index: index,
                name: member.name,
                number: member.number,
                permission: parseInt(member.permission),
                avatar: member.avatar,
            })
        })

        sortedGroupMembers.sort(function (a, b) {
            return parseInt(b.permission) - parseInt(a.permission)
        })

        sortedGroupMembers.forEach((member, index) => {
            Load_Edit_Whatsapp_Contents(member.index, index, member.name, member.number, member.avatar, member.permission)
        })
    })
}))

$(document).on("click", "#Edit-Whatsapp-Top-Field-Back", function() {
    $("#Edit-Whatsapp").removeClass().addClass("Hide-Edit-Whatsapp")
    $("#Edit-Whatsapp-AddUsers-Container").removeClass("AddUsers-Show").addClass("AddUsers-Hide")
    This_Whatsapp_Add_Members = false
})

$(document).on("click", "#Edit-Whatsapp-Click-Back", function() {
    $("#Edit-Whatsapp").removeClass().addClass("Hide-Edit")
    This_Whatsapp_Add_Members = false
    $("#Edit-Whatsapp-AddUsers-Container").removeClass("AddUsers-Show").addClass("AddUsers-Hide")
    $("#Whatsapping").removeClass()
    $("#Whatsapp").removeClass()
})

$(document).on("click", "#Edit-Whatsapp-Action-Remove", function() {
    if (This_Member_Perm == 2) {
        $(".Edit-Whatsapp-RemoveGP-Content").removeClass("Edit-Whatsapp-RemoveGP-Hide").addClass("Edit-Whatsapp-RemoveGP-Show")
    } else {
        New_Notification("Whatsapp", "Whatsapp", "Warnung", "Du kannst die Gruppe nur als Besitzter löschen!", "Jetzt")
    }
})

$(document).on("click", "#Edit-Whatsapp-RemoveGP-Confirm", function() {
    $(".Edit-Whatsapp-RemoveGP-Content").removeClass("Hide-Edit-Whatsapp")
    $("#Edit-Whatsapp").removeClass().addClass("Hide-Edit-Whatsapp")
    $("#Whatsapping").removeClass().addClass("Hide-Edit-Whatsapp")

    $.post('https://cc_phone/deleteGroup', JSON.stringify({
        groupId: This_Whatsapp_DataId
    })).done(() =>  {
        setTimeout(function() {
            Load_Whatsapp()
            $("#Whatsapping").removeClass()
            $(".Edit-Whatsapp-RemoveGP-Content").removeClass("Hide-Edit-Whatsapp")
            $(".Edit-Whatsapp-RemoveGP-Content").removeClass("Edit-Whatsapp-RemoveGP-Show").addClass("Edit-Whatsapp-RemoveGP-Hide")
        }, 300)
    })
})

$(document).on("click", "#Edit-Whatsapp-RemoveGP-Cancel", function() {
    $(".Edit-Whatsapp-RemoveGP-Content").removeClass("Edit-Whatsapp-RemoveGP-Show").addClass("Edit-Whatsapp-RemoveGP-Hide")
})

$(document).on("click", "#Edit-Whatsapp-Action-Leave", function() {
    if (This_Member_Perm != 2) {
        $(".Edit-Whatsapp-LeaveGP-Content").removeClass("Hide-Edit-Whatsapp").addClass("Edit-Whatsapp-LeaveGP-Show")
    } else {
        New_Notification("Whatsapp", "Whatsapp", "Warnung", "Du kannst die Gruppe als Besitzter nicht verlassen", "Jetzt")
    }
})

$(document).on("click", "#Edit-Whatsapp-LeaveGP-Confirm", function() {
    $(".Edit-Whatsapp-LeaveGP-Content").removeClass("Edit-Whatsapp-LeaveGP-Show").addClass("Hide-Edit-Whatsapp")
    $("#Edit-Whatsapp").removeClass().addClass("Hide-Edit-Whatsapp")
    $("#Whatsapping").removeClass().addClass("Hide-Edit-Whatsapp")

    $.post('https://cc_phone/leaveGroup', JSON.stringify({
        groupId: This_Whatsapp_DataId
    })).done(() => {
        Load_Whatsapp()
    })

    setTimeout(function() {
        $("#Whatsapping").removeClass()
        $(".Edit-Whatsapp-LeaveGP-Content").removeClass("Hide-Edit-Whatsapp")
    }, 300)
})

$(document).on("click", "#Edit-Whatsapp-LeaveGP-Cancel", function() {
    $(".Edit-Whatsapp-LeaveGP-Content").removeClass("Edit-Whatsapp-LeaveGP-Show").addClass("Edit-Whatsapp-LeaveGP-Hide")
})

$(document).on("click", ".Edit-Whatsapp-User-More", function() {
    This_Edit_Whatsapp_User_Box_Top = Math.trunc($(this).parent().position().top) + Math.trunc($(this).parent().parent().position().top) + 24
    This_Edit_Whatsapp_User_Box = "#" + $(this).parent().attr("id")
    This_Edit_Whatsapp_User_Box_Id = This_Edit_Whatsapp_User_Box.split("-").pop()
    This_Edit_Whatsapp_User_Box_DataId = $(this).parent().attr('data-Edit_Whats_User_DataId')
    This_Edit_Whatsapp_User_Box_Perm = $(this).parent().attr('data-Edit_Whats_User_Perm')
    This_Edit_Whatsapp_User_Box_Name = $("#Edit-Whatsapp-User-Name-" + This_Edit_Whatsapp_User_Box_Id).text()
    This_Edit_Whatsapp_User_Box_Info = $("#Edit-Whatsapp-User-Info-" + This_Edit_Whatsapp_User_Box_Id).text()

    if (This_Edit_Whatsapp_User_Box_Perm == "1") {
        $("#Edit-Whatsapp-Option-MakeAdmin-Img-Outer").attr("fill", "var(--Fav-Rec-R-C)");
        $("#Edit-Whatsapp-Option-MakeAdmin-Img-Inner").attr("fill", "var(--Fav-Rec-R-C)");
        $("#Edit-Whatsapp-Option-MakeAdmin-Text").css("color", "var(--Texts-R-C)");
        $("#Edit-Whatsapp-Option-MakeAdmin-Text").text("Remove Admin");
    } else if (This_Edit_Whatsapp_User_Box_Perm == "0") {
        $("#Edit-Whatsapp-Option-MakeAdmin-Img-Outer").attr("fill", "var(--Fav-O-C)");
        $("#Edit-Whatsapp-Option-MakeAdmin-Img-Inner").attr("fill", "var(--Fav-I-C)");
        $("#Edit-Whatsapp-Option-MakeAdmin-Text").css("color", "var(--Texts-A-C)");
        $("#Edit-Whatsapp-Option-MakeAdmin-Text").text("Make Admin");
    }

    $("#Edit-Whatsapp-Option-Content").css("transition", "none");
    $("#Edit-Whatsapp-Option-Content").css("top", 100 * This_Edit_Whatsapp_User_Box_Top / window.innerHeight + "vh")

    setTimeout(function() {
        $("#Edit-Whatsapp-Option-Content").css("transition", "all 0.3s ease-in-out 0s")
    }, 400)

    $("#Edit-Whatsapp-Option-Content").removeClass("Edit-Whatsapp-Option-Hide").addClass("Edit-Whatsapp-Option-Show")
    $("#Edit-Whatsapp-Option-Blur-Back").removeClass("Edit-Whatsapp-Option-Blur-Back-Hide").addClass("Edit-Whatsapp-Option-Blur-Back-Show")
})

$(document).on("click", "#Edit-Whatsapp-Option-Kick", function() {
    $("#Edit-Whatsapp-Option-Content").removeClass("Edit-Whatsapp-Option-Show").addClass("Edit-Whatsapp-Option-Hide")
    $("#Edit-Whatsapp-Option-Blur-Back").removeClass("Edit-Whatsapp-Option-Blur-Back-Show").addClass("Edit-Whatsapp-Option-Blur-Back-Hide")

    $.post('https://cc_phone/kickGroup', JSON.stringify({
        groupId: This_Whatsapp_DataId,
        member: This_Edit_Whatsapp_User_Box_DataId,
        number: This_Edit_Whatsapp_User_Box_Info
    })).done(() => {
        Load_Edit_Whatsapp()
    })
})

$(document).on("click", "#Edit-Whatsapp-Option-MakeAdmin", function() {
    $("#Edit-Whatsapp-Option-Content").removeClass("Edit-Whatsapp-Option-Show").addClass("Edit-Whatsapp-Option-Hide")
    $("#Edit-Whatsapp-Option-Blur-Back").removeClass("Edit-Whatsapp-Option-Blur-Back-Show").addClass("Edit-Whatsapp-Option-Blur-Back-Hide")

    if (This_Edit_Whatsapp_User_Box_Perm == 0) {
        This_Edit_Whatsapp_User_Box_Perm = 1
    } else if (This_Edit_Whatsapp_User_Box_Perm == 1) {
        This_Edit_Whatsapp_User_Box_Perm = 0
    }

    $.post('https://cc_phone/setGroupAdmin', JSON.stringify({
        groupId: This_Whatsapp_DataId,
        member: This_Edit_Whatsapp_User_Box_DataId,
        permission: This_Edit_Whatsapp_User_Box_Perm
    })).done(() => {
        Load_Edit_Whatsapp()
    })
})

$(document).on("click", "#Edit-Whatsapp-Top-Field-Right", function() {
    if (This_Member_Perm == "2" || This_Member_Perm == "1") {
        const Current_Whatsapp_GPName = $("#Edit-Whatsapp-Name").text()
        $("#Edit-Whatsapp-GPName-Edit-Textbox").val(Current_Whatsapp_GPName)

        $(".Edit-Whatsapp-GPName-Edit-Content").removeClass("Edit-Whatsapp-GPName-Edit-Hide").addClass("Edit-Whatsapp-GPName-Edit-Show")
    }
})

$(document).on("click", "#Edit-Whatsapp-GPName-Edit-Apply", (Update_Whatsapp_GPName = function Update_Whatsapp_GPName() {
    const GPName_New_Text = $("#Edit-Whatsapp-GPName-Edit-Textbox").val()
    if (GPName_New_Text != "") {
        $("#Whatsapping-Title").text(GPName_New_Text)

        $.post('https://cc_phone/changeGroupName', JSON.stringify({
            groupId: This_Whatsapp_DataId,
            name: GPName_New_Text
        })).done(() => {
            setTimeout(() => {
                Load_Edit_Whatsapp()
            }, 300)
        })

        $(".Edit-Whatsapp-GPName-Edit-Content").removeClass("Edit-Whatsapp-GPName-Edit-Show").addClass("Edit-Whatsapp-GPName-Edit-Hide")
    } else {
        New_Notification("Whatsapp", "Whatsapp", "Warnning!", "You cant name it nothing", "Now")
    }
}))

$(document).on("click", "#Edit-Whatsapp-GPName-Edit-Cancel", function() {
    $("#Edit-Whatsapp-GPName-Edit-Textbox").val("")
    $(".Edit-Whatsapp-GPName-Edit-Content").removeClass("Edit-Whatsapp-GPName-Edit-Show").addClass("Edit-Whatsapp-GPName-Edit-Hide")
})

$(document).on("click", "#Edit-Whatsapp-Option-Close", function() {
    $("#Edit-Whatsapp-Option-Content").removeClass("Edit-Whatsapp-Option-Show").addClass("Edit-Whatsapp-Option-Hide")
    $("#Edit-Whatsapp-Option-Blur-Back").removeClass("Edit-Whatsapp-Option-Blur-Back-Show").addClass("Edit-Whatsapp-Option-Blur-Back-Hide")
})

$(document).on("click", "#Edit-Whatsapp-Avatar, .Edit-Whatsapp-Avatar-Image", function() {
    if (This_Member_Perm == "2" || This_Member_Perm == "1") {
        const Current_Whatsapp_Avatar = $(".Edit-Whatsapp-Avatar-Image-Img").attr('src')
        $("#Edit-Whatsapp-Avatar-Edit-Textbox").val(Current_Whatsapp_Avatar)

        $(".Edit-Whatsapp-Avatar-Edit-Content").removeClass("Edit-Whatsapp-GPName-Edit-Hide").addClass("Edit-Whatsapp-GPName-Edit-Show")
    }
})

$(document).on("click", "#Edit-Whatsapp-Avatar-Edit-Apply", (Update_Whatsapp_GPName = function Update_Whatsapp_GPName() {
    const backgroundText = $("#Edit-Whatsapp-Avatar-Edit-Textbox").val().toString()
    const extension = backgroundText.split('.').pop()

    if (backgroundText != "") {
        if (backgroundText.includes("<") || backgroundText.includes(">")) {
            New_Notification("Whatsapp", "Whatsapp", "Fehler", "Blacklisted Wort erkannt!", "Jetzt")
        } else {
            if (extension == 'png' || extension == 'gif' || extension == 'jpg' || extension == 'jpeg' && extension != "" && extension != null) {
                $.get(backgroundText).done(function() {
                    $.post('https://cc_phone/changeGroupAvatar', JSON.stringify({
                        groupId: This_Whatsapp_DataId,
                        avatar: backgroundText
                    })).done(() => {
                        setTimeout(() => {
                            Load_Edit_Whatsapp()
                        }, 300)
                    })

                    New_Notification("Whatsapp", "Whatsapps", "Info", "Avatar wurde gesetzt!", "Jetzt")
                }).fail(function() {
                    New_Notification("Whatsapp", "Whatsapp", "Info", "Dieser Link ist ungültig!", "Jetzt")
                })
            } else {
                New_Notification("Whatsapp", "Whatsapp", "Info", "Ungültiges Format", "Jetzt")
            }
        }

        $(".Edit-Whatsapp-Avatar-Edit-Content").removeClass("Edit-Whatsapp-GPName-Edit-Show").addClass("Edit-Whatsapp-GPName-Edit-Hide")
    } else {
        New_Notification("Whatsapp", "Whatsapp", "Warnning!", "You cant name it nothing", "Now")
    }
}))

$(document).on("click", "#Edit-Whatsapp-Avatar-Edit-Cancel", function() {
    $("#Edit-Whatsapp-Avatar-Edit-Textbox").val("")
    $(".Edit-Whatsapp-Avatar-Edit-Content").removeClass("Edit-Whatsapp-GPName-Edit-Show").addClass("Edit-Whatsapp-GPName-Edit-Hide")
})

$(document).on("click", "#Add-Whatsapp-Top-Field-Right", function() {
    const name = $("#Add-Whatsapp-Textbox").val()
    
    if (name == "") {
        New_Notification("Whatsapp", "Whatsapp", "Warnung", "Bitte wähle ein namen", "Jetzt")
    } else {
        var found = false
        var members = []

        $('.Add-Whatsapp-User-Box .Checkbox:checkbox:checked').each(function(i, obj) {
            if ($.isEmptyObject(obj)) {
                found = false
            } else {
                found = true
                var This_Checked_Add_Whatsapp_User_Box = $(obj).parent().parent()
                var This_Checked_Add_Whatsapp_User_Number = This_Checked_Add_Whatsapp_User_Box.find(".Add-Whatsapp-User-Number").text()

                members.push({
                    number: This_Checked_Add_Whatsapp_User_Number,
                    permission: 0
                })
            }
        })

        if (found) {
            $.post('https://cc_phone/createGroup', JSON.stringify({
                name: name,
                members: members
            })).done(() => {
                setTimeout(() => {
                    Load_Whatsapp()
                    $("#Add-Whatsapp").removeClass().addClass("Hide-Add-Whatsapp")
                }, 100)
            })
        } else {
            New_Notification("Whatsapp", "Whatsapp", "Warnning!", "Bitte wählen Sie mindestens ein Mitglied", "Now")
        }
    }
})

$(document).on("click", "#M-App-10", (Load_Whatsapp = function Load_Whatsapp() {
    currentApp = 'Whatsapp'

    $(".Whatsapp-Content-Box").remove()

    $.post('https://cc_phone/getGroups', JSON.stringify({
    })).done((groupData) => {
        groupData.forEach((group, index) => {
            var hours = '0:00'

            if (group.date != 0) {
                const date = new Date(group.date * 1000)
                var hours = `${date.getHours()}:${date.getMinutes()}`
            }

            if (group.msg.includes("jpg") || group.msg.includes("png")) {
                group.msg = 'Bild'
            }

            Load_Whatsapp_Contents(group.id, index, group.name, group.msg, hours, group.avatar, "Read")
        })
    })

    $("#Whatsapp").addClass("Show-App").removeClass("Hide-App")
}))

$(document).on("click", "#Whatsapp-Top-Field-Back", (Whatsapp_Back = function Whatsapp_Back() {
    $("#Whatsapp").removeClass("Show-App").addClass("Hide-App")
}))

$(document).on("click", "#Whatsapp-Click-Back", function() {
    Whatsapp_Back()
})

//----------------------------------------------------------------------------------------------------Photos

var maxPhotos = 0

function refreshPicture() {
    $("#Photos-Contents").empty()

    $.post('https://cc_phone/getGallery', JSON.stringify({
    })).done((gallery) => {
        maxPhotos = gallery.length

        gallery.forEach((galleryItem, index) => {
            $("#Photos-Contents").append(`
                <div id="Photos-Content" data-index="${index + 1}" data-id="${galleryItem.id}" data-link="${galleryItem.link}">
                    <img src="${galleryItem.link}" alt="">
                </div>
            `)
        })

        var element = document.getElementById("Photos-Contents")
        element.scrollTop = element.scrollHeight
    })

    var element = document.getElementById("Photos-Contents")
    element.scrollTop = element.scrollHeights

    $("#Photos").removeClass().addClass("Show-App")
}

$(document).on("click", "#M-App-7", function() {
    currentApp = "Photos"

    refreshPicture()
})

var isInPhotoState = 0
var photoIndex = 0
var photoId = 0
var photoLink = ''

$(document).on("click", "#Photos-Content", function() {
    const index = $(this).attr('data-index')
    const id = $(this).attr('data-id')
    const link = $(this).attr('data-link')

    isInPhotoState = 1
    photoIndex = index
    photoId = id
    photoLink = link
    $("#Photos-Box-Title").text(`${index}/${maxPhotos}`)
    $("#Photos-Form-Img").attr('src', link)
    $("#Photos-Form").addClass("Show-Photos-Form").removeClass("Hide-Photos-Form")
})

$(document).on("click", ".Photos-Form-Btn", function() {
    const type = $(this).attr('data-type')

    switch (type) {
        case '1':
            copyStuff(photoLink)
        break
        case '2':
            isInPhotoState = 2

            $("#Photos-Contacts-Container").empty()

            $("#Photos-Top-Field-Right").show()

            $("#Photos-Form-Photo-Container").children().attr('src', photoLink)

            $.post("https://cc_phone/getContacts").done((contacts) => {
                test = []

                contacts.forEach((contact, index) => {
                    test.push({
                        index: index,
                        id: contact.id,
                        name: contact.name,
                        number: contact.number,
                        favorite: contact.favorite,
                        delete: contact.delete,
                        avatar: contact.avatar
                    })
                })
        
                test.sort(function(a, b) {
                    var a1 = typeof a.name, b1 = typeof b.name
                    return a1 < b1 ? -1 : a1 > b1 ? 1 : a.name < b.name ? -1 : a.name > b.name ? 1 : 0
                })

                test.forEach((contact, index) => {
                    $("#Photos-Contacts-Container").append(`
                        <div id="Photos-Contacts-Box-${contact.index}" class="Photos-Contacts-Box" data-link="${photoLink}">
                            ${contact.avatar == "default" ? `
                            <div id="Photos-Contacts-Box-Avatar-${contact.index}" class="Photos-Contacts-Box-Avatar">
                                <svg id="Photos-Contacts-Box-Avatar-Img-${contact.index}" class="Photos-Contacts-Box-Avatar-Img" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.6vh" height="3vh" viewBox="0 0 26 30">
                                    <g fill="var(--Icons-C)" stroke="none" transform="translate(0,30) scale(0.1,-0.1)">
                                        <path d="M80 280 c-27 -27 -27 -93 0 -120 30 -30 83 -27 109 6 27 34 27 74 0 108 -26 33 -79 36 -109 6z"></path>
                                        <path d="M32 99 c-19 -13 -32 -28 -30 -38 4 -22 85 -61 128 -61 42 0 118 33 126 54 22 57 -151 91 -224 45z"></path>
                                    </g>
                                </svg>
                            </div>
                            ` : `
                            <div id="Photos-Contacts-Content-Box-Avatar-Image-${contact.index}" class="Photos-Contacts-Content-Box-Avatar-Image">
                                <img id="Photos-Contacts-Content-Box-Avatar-Image-Img-${contact.index}" class="Photos-Contacts-Content-Box-Avatar-Image-Img" src="${contact.avatar}">
                            </div>
                            `
                            }

                            <div id="Photos-Contacts-Name-${contact.index}" class="Photos-Contacts-Name">${contact.name}</div>
                            <div id="Photos-Contacts-Number-${contact.index}" class="Photos-Contacts-Number">${contact.number}</div>
        
                            <div class="Photos-Contacts-Checkbox">
                                <input class="Checkbox Checkbox--shadow" id="Photos-Contacts-Checkbox-${contact.index}" type="checkbox">
                                <label for="Photos-Contacts-Checkbox-${contact.index}"></label>
                            </div>
        
                            <div class="Photos-Contacts-Line"></div>
                        </div>
                    `)
                })
            })

            $("#Photos-Form-Contacts").removeClass().addClass('Show-Photos-Form')
        break
        case '3':
            $.post('https://cc_phone/deletePicture', JSON.stringify({
                index: photoIndex,
                id: photoId
            })).done(() => {
                $("#Photos-Form").addClass("Hide-Photos-Form").removeClass("Show-Photos-Form")
                isInPhotoState = 0
                refreshPicture()
            })
        break
    }
})

$(document).on("click", "#Photos-Top-Field-Right-Text", function() {
    var found = false

    $(".Checkbox:checkbox:checked").each(function(i, object) {
        if ($.isEmptyObject(object)) {
            found = false
        } else {
            found = true

            const box = $(object).parent().parent()
            const image = box.attr('data-link')
            const number = box.find(".Photos-Contacts-Number").text()
            $.post("https://cc_phone/sendMessage", JSON.stringify({
                msg: image,
                number: number,
                type: 'SI',
                coords: false
            }))
        }
    })

    if (found) {
        $("#Photos-Form-Contacts").addClass("Hide-Photos-Form").removeClass("Show-Photos-Form")
        $("#Photos-Top-Field-Right").hide()
        isInPhotoState = 1
        New_Notification("Photos", "Photos", "Erfolg", "Foto versendet!")
    } else {
        New_Notification("Photos", "Photos", "Fehler", "Du musst eine Person auswählen bevor du es abschicken kannst!")
    }
})

$(document).on("click", "#Photos-Top-Field-Back", (Photos_Back = function Photos_Back() {
    if (isInPhotoState == 2) {
        $("#Photos-Form-Contacts").addClass("Hide-Photos-Form").removeClass("Show-Photos-Form")
        $("#Photos-Top-Field-Right").hide()
        isInPhotoState = 1
    } else if (isInPhotoState == 1) {
        $("#Photos-Form").addClass("Hide-Photos-Form").removeClass("Show-Photos-Form")
        isInPhotoState = 0
    } else {
        currentApp = "Home"
        $("#Photos").removeClass().addClass("Hide-App")
    }
}))

$(document).on("click", "#Photos-Click-Back", function() {
    Photos_Back()
})

//----------------------------------------------------------------------------------------------------Phone

$(document).on("click", "#D-App-1", (Load_Phone = function Load_Phone() {
    currentApp = 'Phone'
    
    $("#Dial-Number-Text").text("")
    $("#Num-N").css("opacity", "0")
    $("#Num-N").css("transform", "scale(0)")
    $("#Num-Text-A").css("display", "none")
    $("#Phone").removeClass().addClass("Show-App")
    Show_Number_Pad()
}))

$(document).on("click", "#Phone-Click-Back", function() {
    currentApp = 'Home'
    $("#Phone").removeClass().addClass("Hide-App")
})

function Load_Favorites_Contents(Fav_DataId, Fav_Id, Fav_Name, Fav_Type) {
    favItem = `
        <div id="Phone-Favorites-Content-Box-${Fav_Id}" class="Phone-Favorites-Content-Box">
            <div id="Favorites-Content-Box-Avatar-${Fav_Id}" class="Favorites-Content-Box-Avatar">
                <div id="Favorites-Content-Box-Avatar-Text-${Fav_Id}" class="Favorites-Content-Box-Avatar-Text">${Fav_Name.charAt(0)}</div>
            </div>

            <div id="Favorites-Content-Box-Tele-${Fav_Id}" class="Phone-Favorites-Content-Box-Tele"></div>
            <div id="Favorites-Content-Box-Name-${Fav_Id}" class="Favorites-Content-Box-Name">${Fav_Name}</div>
            <div id="Favorites-Content-Box-Type-${Fav_Id}" class="Favorites-Content-Box-Type">${Fav_Type}</div>
            <div id="Favorites-Content-Box-Call-${Fav_Id}" class="Favorites-Content-Box-Call">
                <svg id="Favorites-Content-Box-Call-Icon-${Fav_Id}" class="Favorites-Content-Box-Call-Icon" xmlns="http://www.w3.org/2000/svg" version="1.0" width="1vh" height="1vh" viewBox="0 0 512 512">
                    <g transform="translate(0,512) scale(0.1,-0.1)" fill="var(--Icons-L-C)" stroke="none">
                        <path d="M913 4916 c-77 -25 -137 -74 -319 -258 -234 -238 -297 -333 -360 -545 -21 -69 -27 -117 -31 -224 -10 -247 30 -371 219 -687 498 -833 1051 -1488 1755 -2077 451 -378 1126 -820 1365 -893 202 -63 426 -58 627 12 175 61 282 139 522 383 217 219 234 249 234 393 0 159 1 157 -392 552 -359 360 -389 384 -505 408 -61 12 -137 3 -200 -23 -18 -8 -134 -71 -257 -140 -253 -142 -283 -152 -387 -122 -59 16 -61 19 -757 713 -474 474 -704 710 -718 738 -25 54 -34 128 -20 179 6 22 65 137 132 255 67 118 128 230 136 248 26 61 34 132 22 196 -21 117 -37 137 -402 503 -390 390 -396 394 -542 400 -49 2 -96 -3 -122 -11z" />
                    </g>
                </svg>
            </div>

            <div id="Favorites-Content-Box-Info-${Fav_Id}" class="Favorites-Content-Box-Info">
                <svg id="Favorites-Content-Box-Info-Icon-${Fav_Id}" class="Favorites-Content-Box-Info-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="4.4vh" viewBox="0 0 44 44">
                    <g fill="var(--Icons-A-C)" stroke="none" transform="translate(0,44) scale(0.1,-0.1)">
                        <path d="M145 414 c-82 -30 -138 -111 -137 -200 1 -135 122 -231 256 -202 99 21 178 137 161 236 -13 78 -78 150 -156 172 -45 13 -76 12 -124 -6z m170 -38 c54 -29 90 -94 89 -161 -2 -108 -81 -185 -190 -185 -59 0 -102 19 -142 64 -57 63 -57 177 0 242 66 75 151 90 243 40z" />
                        <path d="M200 320 c0 -11 7 -20 15 -20 8 0 15 9 15 20 0 11 -7 20 -15 20 -8 0 -15 -9 -15 -20z" />
                        <path d="M188 243 c20 -4 22 -10 22 -64 0 -52 -2 -59 -20 -59 -11 0 -20 -4 -20 -10 0 -5 23 -10 50 -10 28 0 50 5 50 10 0 6 -9 10 -20 10 -18 0 -20 7 -20 65 l0 65 -32 -1 c-24 -1 -27 -3 -10 -6z" />
                    </g>
                </svg>
            </div>

            <div id="Favorites-Content-Box-DataId-${Fav_Id}" class="Favorites-Content-Box-DataId">${Fav_DataId}</div>
            <div id="Favorites-Content-Box-Line-${Fav_Id}" class="Favorites-Content-Box-Line"></div>
        </div>
    `

    $("#Phone-Favorites-Content").append(favItem)
}

$(document).on("click", "#Phone-Bottom-Bar-Button-F", (Load_Favorites = function Load_Favorites() {
    $(".Phone-Favorites-Content-Box").remove()

    $.post("https://cc_phone/getContacts").done((contacts) => {
        test = []

        contacts.forEach((contact, index) => {
            test.push({
                index: index,
                id: contact.id,
                name: contact.name,
                number: contact.number,
                favorite: contact.favorite,
                delete: contact.delete,
                avatar: contact.avatar
            })
        })

        test.sort(function(a, b) {
            var a1 = typeof a.name, b1 = typeof b.name
            return a1 < b1 ? -1 : a1 > b1 ? 1 : a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        })

        test.forEach((contact) => {
            Load_Favorites_Contents(contact.id, contact.index, contact.name, contact.number, contact.favorite)
        })
    })

    //Section
    $("#Phone-Favorites-Section").css("display", "block")
    $("#Phone-Dial-Section").css("display", "none")
    $("#Phone-Recents-Section").css("display", "none")

     //Fill
    $("#Phone-Bottom-Bar-Icon-Favorites").css("fill", "var(--Icons-A-C)")
    $("#Phone-Bottom-Bar-Icon-Numpad").css("fill", "var(--Icons-C)")
    $("#Phone-Bottom-Bar-Icon-Recents").css("fill", "var(--Icons-C)")

    //Color
    $("#Phone-Bottom-Bar-Text-Favorites").css("color", "var(--Texts-A-C)")
    $("#Phone-Bottom-Bar-Text-Numpad").css("color", "var(--Texts-C)")
    $("#Phone-Bottom-Bar-Text-Recents").css("color", "var(--Texts-C)")
}))

$(document).on("click", ".Phone-Recents-Content-Box-Tele", function() {
    const This_Phone_Fav_Call_Box = "#" + $(this).attr("id")
    const This_Phone_Fav_Call_Id = This_Phone_Fav_Call_Box.split("-").pop()
    const This_Phone_Fav_Call_Name_Text = $("#Recents-Content-Box-Name-" + This_Phone_Fav_Call_Id).text()
    const This_Phone_Fav_Call_Number = $("#Recents-Content-Box-Type-" + This_Phone_Fav_Call_Id).text()
    
    $("#Call-Number-Text").text(This_Phone_Fav_Call_Name_Text)

    Incoming_Call = This_Phone_Fav_Call_Number

    $.post("https://cc_phone/attemptCall", JSON.stringify({
        number: This_Phone_Fav_Call_Number
    })).done((data) => {
        if (!data.state) {
            if (data.text != null) {
                New_Notification("Phone", "Phone", "Telefon", data.text)
            }
        } else {
            callFrequenz = data.text
        }
    })

    clearInterval(Call_Timer)

    setTimeout(function() {
        $("#Call-Timer").text("Wird Angerufen")
    }, 400)

    //$("#Business").removeClass("Show-Business").addClass("Call-Hide-Business")

    $("#Call").removeClass().addClass("Call-Show-Phone")
    $("#Call-Back-Transition").css("display", "block")

    Call_Is_Mute = false
    $("#Call-Mute-Off").css("opacity", "0")
    $("#Call-Mute-On").css("opacity", "1")
    $("#Call-Mute-Text").text("Mute")

    Call_Before_Section = "Phone"
})

$(document).on("click", ".Phone-Favorites-Content-Box-Tele", function() {
    var This_Phone_Fav_Call_Box = "#" + $(this).attr("id")
    var This_Phone_Fav_Call_Id = This_Phone_Fav_Call_Box.split("-").pop()
    var This_Phone_Fav_Call_Name_Text = $("#Favorites-Content-Box-Name-" + This_Phone_Fav_Call_Id).text()
    var This_Phone_Fav_Call_Number = $("#Favorites-Content-Box-Type-" + This_Phone_Fav_Call_Id).text()

    $("#Call-Number-Text").text(This_Phone_Fav_Call_Name_Text)

    Incoming_Call = This_Phone_Fav_Call_Number

    $.post("https://cc_phone/attemptCall", JSON.stringify({
        number: This_Phone_Fav_Call_Number
    })).done((data) => {
        if (!data.state) {
            if (data.text != null) {
                New_Notification("Phone", "Phone", "Telefon", data.text)
            }
        } else {
            callFrequenz = data.text
        }
    })

    clearInterval(Call_Timer)

    setTimeout(function() {
        $("#Call-Timer").text("Wird Angerufen")
    }, 400)

    //$("#Business").removeClass("Show-Business").addClass("Call-Hide-Business")

    $("#Call").removeClass().addClass("Call-Show-Phone")
    $("#Call-Back-Transition").css("display", "block")

    Call_Is_Mute = false
    $("#Call-Mute-Off").css("opacity", "0")
    $("#Call-Mute-On").css("opacity", "1")
    $("#Call-Mute-Text").text("Mute")

    Call_Before_Section = "Phone"
})

$(document).on("click", "#Favorites-Top-Field-Back-Text", function() {
    Show_Number_Pad()
})

$(document).on("click", ".Favorites-Content-Box-Info", function() {
    const This_Favorites_Box_Top = Math.trunc($(this).parent().position().top + 150)
    This_Favorites_Box = "#" + $(this).parent().attr("id")
    This_Favorites_Box_Id = This_Favorites_Box.split("-").pop()
    This_Favorites_Box_DataId = $("#Favorites-Content-Box-DataId-" + This_Favorites_Box_Id).text()
    This_Favorites_Box_Name = $("#Favorites-Content-Box-Name-" + This_Favorites_Box_Id).text()
    This_Favorites_Box_Number = $("#Favorites-Content-Box-Type-" + This_Favorites_Box_Id).text()
    
    $("#Phone-Favorites-Option-Content").css("transition", "none")
    //$("#Phone-Favorites-Option-Content").css("top", This_Favorites_Box_Top + "px")
    $("#Phone-Favorites-Option-Content").css("top", 100 * This_Favorites_Box_Top / window.innerHeight + "vh")
    
    setTimeout(function() {
        $("#Phone-Favorites-Option-Content").css("transition", "all 0.3s ease-in-out 0s")
    }, 400)

    $("#Phone-Favorites-Option-Content").removeClass("Phone-Favorites-Option-Hide").addClass("Phone-Favorites-Option-Show")
    $("#Phone-Favorites-Option-Blur-Back").removeClass("Phone-Favorites-Option-Blur-Back-Hide").addClass("Phone-Favorites-Option-Blur-Back-Show")
})


$(document).on("click", "#Phone-Favorites-Option-Del", function() {
    $("#Phone-Favorites-Option-Content").removeClass("Phone-Favorites-Option-Show").addClass("Phone-Favorites-Option-Hide")
    $("#Phone-Favorites-Option-Blur-Back").removeClass("Phone-Favorites-Option-Blur-Back-Show").addClass("Phone-Favorites-Option-Blur-Back-Hide")

    $.post("https://cc_phone/editContact", JSON.stringify({
        id: This_Favorites_Box_DataId,
        index: This_Favorites_Box_Id,
        name: This_Favorites_Box_Name,
        number: This_Favorites_Box_Number,
        favorite: false,
    }))

    Load_Favorites()
})


$(document).on("click", "#Phone-Favorites-Option-Close", function() {
    $("#Phone-Favorites-Option-Content").removeClass("Phone-Favorites-Option-Show").addClass("Phone-Favorites-Option-Hide")
    $("#Phone-Favorites-Option-Blur-Back").removeClass("Phone-Favorites-Option-Blur-Back-Show").addClass("Phone-Favorites-Option-Blur-Back-Hide")
})


$(document).on("click", "#Phone-Bottom-Bar-Button-N", (Show_Number_Pad = function Show_Number_Pad() {
    //Section
    $("#Phone-Favorites-Section").css("display", "none")
    $("#Phone-Dial-Section").css("display", "block")
    $("#Phone-Recents-Section").css("display", "none")

    //Fill
    $("#Phone-Bottom-Bar-Icon-Favorites").css("fill", "var(--Icons-C)")
    $("#Phone-Bottom-Bar-Icon-Numpad").css("fill", "var(--Icons-A-C)")
    $("#Phone-Bottom-Bar-Icon-Recents").css("fill", "var(--Icons-C)")

    //Color
    $("#Phone-Bottom-Bar-Text-Favorites").css("color", "var(--Texts-C)")
    $("#Phone-Bottom-Bar-Text-Numpad").css("color", "var(--Texts-A-C)")
    $("#Phone-Bottom-Bar-Text-Recents").css("color", "var(--Texts-C)")
}))


$(document).on("click", ".Num-Bubble", function() {
    const Dial_Text = $("#Dial-Number-Text").text()
    const Num_Text = this.id
    const last_Char = Num_Text.substr(Num_Text.length - 1)
    const Dial_Max_Chars = 12

    if ((last_Char == "0" || last_Char == "1" || last_Char == "2" || last_Char == "3" || last_Char == "4" || last_Char == "5" || last_Char == "6" || last_Char == "7" || last_Char == "8" || last_Char == "9") && Dial_Text.length <= Dial_Max_Chars) {
        Dial_Text_Now = Dial_Text + last_Char
        $("#Dial-Number-Text").text(Dial_Text_Now)
    } else if (last_Char == "N") {
        $("#Dial-Number-Text").text(Dial_Text_Now.slice(0, -1))
        Dial_Text_Now = $("#Dial-Number-Text").text()
    } else {
        Dial_Text_Now = $("#Dial-Number-Text").text()
    }

    if (Dial_Text_Now == "") {
        $("#Num-N").css("opacity", "0")
        $("#Num-N").css("transform", "scale(0)")
        $("#Num-Text-A").css("display", "none")
    } else {
        $("#Num-N").css("opacity", "1")
        $("#Num-N").css("transform", "scale(1)")
        $("#Num-Text-A").css("display", "flex")
    }
})


$(document).on("click", "#Num-C", function() {
    const Dial_Text = $("#Dial-Number-Text").text()

    if (!Dial_Text == "") {
        $("#Call-Number-Text").text(Dial_Text)

        Incoming_Call = Dial_Text

        $.post("https://cc_phone/attemptCall", JSON.stringify({
            number: Dial_Text
        })).done((data) => {
            if (!data.state) {
                if (data.text != null) {
                    New_Notification("Phone", "Phone", "Telefon", data.text)
                }
            } else {
                callFrequenz = data.text
            }
        })

        clearInterval(Call_Timer)

        setTimeout(function() {
            $("#Call-Timer").text("Wird Angerufen")
        }, 400)

        $("#Phone").removeClass().addClass("Call-Hide-Phone")

        $("#Call").removeClass().addClass("Call-Show-Call")
        $("#Call-Back-Transition").css("display", "block")

        Call_Is_Mute = false
        $("#Call-Mute-Off").css("opacity", "0")
        $("#Call-Mute-On").css("opacity", "1")
        $("#Call-Mute-Text").text("Mute")

        Call_Before_Section = "Phone"
    }
})

$(document).on("click", "#Num-Text-A", function() {
    var Dial_Section = "#" + $(this).parent().parent().attr("id")
    var Dial_Number_Now = $(Dial_Section + " #Dial-Number-Text").text()

    $("#New-Contact-Name").val("")
    $("#New-Contact-Num").val(Dial_Number_Now)
    $("#New-Contact-Fav-Switch-State").text("Off")
    $("#New-Contact-Fav-Switch-Img-Inner").attr("fill", "var(--Fav-I-C)")
    New_Contact_Has_Name_And_Num = false
    New_Is_Fav = false
    New_Contact_Name = ""
    New_Contact_Num = ""
    Add_Before_Section = "Phone_Dial"

    $("#New-Contact").removeClass().addClass("Show-New-Contact")
})

function Load_Recents_Contents(Rec_DbId, Rec_DataId, Rec_Id, Contact_Id, Contact_DbId, Rec_Name, Rec_Type, Rec_Time, Rec_IsCon, Rec_IsFav) {
    const recentItem = `
        <div id="Phone-Recents-Content-Box-${Rec_Id}" class="Phone-Recents-Content-Box">
            <div id="Phone-Recents-Content-Box-Tele-${Rec_Id}" class="Phone-Recents-Content-Box-Tele"></div>
            <div id="Recents-Content-Box-Name-${Rec_Id}" class="Recents-Content-Box-Name">${Rec_Name}</div>
            <div id="Recents-Content-Box-Type-${Rec_Id}" class="Recents-Content-Box-Type">${Rec_Type}</div>
            <div id="Recents-Content-Box-Time-${Rec_Id}" class="Recents-Content-Box-Time">${Rec_Time}</div>
            <div id="Recents-Content-Box-Info-${Rec_Id}" class="Recents-Content-Box-Info">
                <svg id="Recents-Content-Box-Info-Img-${Rec_Id}" class="Recents-Content-Box-Info-Img" version="1.0" xmlns="http://www.w3.org/2000/svg" width="4.4vh" viewBox="0 0 44 44">
                    <g fill="var(--Icons-A-C)" stroke="none" transform="translate(0,44) scale(0.1,-0.1)"><path d="M145 414 c-82 -30 -138 -111 -137 -200 1 -135 122 -231 256 -202 99 21 178 137 161 236 -13 78 -78 150 -156 172 -45 13 -76 12 -124 -6z m170 -38 c54 -29 90 -94 89 -161 -2 -108 -81 -185 -190 -185 -59 0 -102 19 -142 64 -57 63 -57 177 0 242 66 75 151 90 243 40z"/><path d="M200 320 c0 -11 7 -20 15 -20 8 0 15 9 15 20 0 11 -7 20 -15 20 -8 0 -15 -9 -15 -20z"/><path d="M188 243 c20 -4 22 -10 22 -64 0 -52 -2 -59 -20 -59 -11 0 -20 -4 -20 -10 0 -5 23 -10 50 -10 28 0 50 5 50 10 0 6 -9 10 -20 10 -18 0 -20 7 -20 65 l0 65 -32 -1 c-24 -1 -27 -3 -10 -6z"/></g>
                </svg>
            </div>

            <div id="Recents-Content-Box-IsCon-${Rec_Id}" class="Recents-Content-Box-IsCon">${Rec_IsCon}</div>
            <div id="Recents-Content-Box-IsFav-${Rec_Id}" class="Recents-Content-Box-IsFav">${Rec_IsFav}</div>
            <div id="Recents-Content-Box-DataId-${Rec_Id}" class="Recents-Content-Box-DataId">${Rec_DataId}</div>
            <div id="Recents-Content-Box-DbId-${Rec_Id}" class="Recents-Content-Box-DbId">${Rec_DbId}</div>
            <div id="Recents-Content-Box-ContactId-${Rec_Id}" class="Recents-Content-Box-ContactId">${Contact_Id}</div>
            <div id="Recents-Content-Box-Contact_DbId-${Rec_Id}" class="Recents-Content-Box-Contact_DbId">${Contact_DbId}</div>
            <div id="Recents-Content-Box-Line-${Rec_Id}" class="Recents-Content-Box-Line"></div>
        </div>
    `

    $("#Phone-Recents-Content").append(recentItem)
}

$(document).on("click", "#Phone-Bottom-Bar-Button-R", (Load_Recents = function Load_Recents() {
    $(".Phone-Recents-Content-Box").remove()

    $.post("https://cc_phone/getCalls").done((calls) => {
        calls.sort(function (a, b) {
            return b.date - a.date
        })

        calls.forEach((call, index) => {
            index = index
            const date = new Date(call.date * 1000)

            Load_Recents_Contents(call.id, call.callIndex, index, call.index, call.contactId, call.name, call.number, `${date.getHours()}:${date.getMinutes()}`, call.isContact, call.isFav)
        })
    })

    //Section
    $("#Phone-Favorites-Section").css("display", "none")
    $("#Phone-Dial-Section").css("display", "none")
    $("#Phone-Recents-Section").css("display", "block")

    //Fill
    $("#Phone-Bottom-Bar-Icon-Favorites").css("fill", "var(--Icons-C)")
    $("#Phone-Bottom-Bar-Icon-Numpad").css("fill", "var(--Icons-C)")
    $("#Phone-Bottom-Bar-Icon-Recents").css("fill", "var(--Icons-A-C)")

    //Color
    $("#Phone-Bottom-Bar-Text-Favorites").css("color", "var(--Texts-C)")
    $("#Phone-Bottom-Bar-Text-Numpad").css("color", "var(--Texts-C)")
    $("#Phone-Bottom-Bar-Text-Recents").css("color", "var(--Texts-A-C)")
}))


$(document).on("click", "#Recents-Top-Field-Back-Text", function() {
    Show_Number_Pad()
})

$(document).on("click", ".Recents-Content-Box-Info", function() {
    const This_Recents_Box_Top = Math.trunc($(this).parent().position().top + 170)
    This_Recents_Box = "#" + $(this).parent().attr("id")
    This_Recents_Box_Id = This_Recents_Box.split("-").pop()
    This_Recents_Box_DataId = $("#Recents-Content-Box-DataId-" + This_Recents_Box_Id).text()
    This_Recents_Box_DbId = $("#Recents-Content-Box-DbId-" + This_Recents_Box_Id).text()
    This_Recents_Box_Contact = $("#Recents-Content-Box-ContactId-" + This_Recents_Box_Id).text()
    This_Recents_Box_ContactDbId = $("#Recents-Content-Box-Contact_DbId-" + This_Recents_Box_Id).text()
    This_Recents_Name = $("#Recents-Content-Box-Name-" + This_Recents_Box_Id).text()
    This_Recents_Number = $("#Recents-Content-Box-Type-" + This_Recents_Box_Id).text()
    This_Recents_IsCon = $("#Recents-Content-Box-IsCon-" + This_Recents_Box_Id).text()
    This_Recents_IsFav = $("#Recents-Content-Box-IsFav-" + This_Recents_Box_Id).text()

    if (This_Recents_IsCon == "true") {
        if (This_Recents_IsFav == "false") {
            $("#Phone-Recents-Option-Add").addClass("Disabled-Recent-Option")
            $("#Phone-Recents-Option-Add-Img").removeClass().addClass("Phone-Recents-Add-Img-Off")
            $("#Phone-Recents-Option-Add-Text").removeClass().addClass("Phone-Recents-Add-Text-Off")
            $("#Phone-Recents-Option-Fav").removeClass("Disabled-Recent-Option")
            $("#Phone-Recents-Option-Fav-Text").text("Add To Favorite")
            $("#Phone-Recents-Option-Fav-Text").removeClass().addClass("Phone-Recents-Fav-Text-On")
            $("#Phone-Recents-Option-Fav-Img-Inner").removeClass().addClass("Phone-Recents-Fav-Inner-On")
            $("#Phone-Recents-Option-Fav-Img-Outer").removeClass().addClass("Phone-Recents-Fav-Outer-On")
        } else if (This_Recents_IsFav == "true") {
            $("#Phone-Recents-Option-Add").addClass("Disabled-Recent-Option")
            $("#Phone-Recents-Option-Add-Img").removeClass().addClass("Phone-Recents-Add-Img-Off")
            $("#Phone-Recents-Option-Add-Text").removeClass().addClass("Phone-Recents-Add-Text-Off")
            $("#Phone-Recents-Option-Fav-Text").text("Remove From Favorite")
            $("#Phone-Recents-Option-Fav").removeClass("Disabled-Recent-Option")
            $("#Phone-Recents-Option-Fav-Text").removeClass().addClass("Phone-Recents-Fav-Text-Off")
            $("#Phone-Recents-Option-Fav-Img-Inner").removeClass().addClass("Phone-Recents-Fav-Inner-Off")
            $("#Phone-Recents-Option-Fav-Img-Outer").removeClass().addClass("Phone-Recents-Fav-Outer-Off")
        }
    } else if (This_Recents_IsCon == "false") {
        $("#Phone-Recents-Option-Add").removeClass("Disabled-Recent-Option")
        $("#Phone-Recents-Option-Add-Img").removeClass().addClass("Phone-Recents-Add-Img-On")
        $("#Phone-Recents-Option-Add-Text").removeClass().addClass("Phone-Recents-Add-Text-On")
        $("#Phone-Recents-Option-Fav").addClass("Disabled-Recent-Option")
        $("#Phone-Recents-Option-Fav-Text").text("Remove From Favorite")
        $("#Phone-Recents-Option-Fav-Text").removeClass().addClass("Phone-Recents-Fav-Text-Dis")
        $("#Phone-Recents-Option-Fav-Img-Inner").removeClass().addClass("Phone-Recents-Fav-Inner-Dis")
        $("#Phone-Recents-Option-Fav-Img-Outer").removeClass().addClass("Phone-Recents-Fav-Outer-Dis")
    }

    $("#Phone-Recents-Option-Content").css("transition", "none")
    //$("#Phone-Recents-Option-Content").css("top", This_Recents_Box_Top + "px")
    $("#Phone-Recents-Option-Content").css("top", 100 * This_Recents_Box_Top / window.innerHeight + "vh")

    setTimeout(function() {
        $("#Phone-Recents-Option-Content").css("transition", "all 0.3s ease-in-out 0s")
    }, 400)

    $("#Phone-Recents-Option-Content").removeClass("Phone-Recents-Option-Hide").addClass("Phone-Recents-Option-Show")
    $("#Phone-Recents-Option-Blur-Back").removeClass("Phone-Recents-Option-Blur-Back-Hide")
    $("#Phone-Recents-Option-Blur-Back").addClass("Phone-Recents-Option-Blur-Back-Show")
})

$(document).on("click", "#Phone-Recents-Option-Add", function() {
    if (This_Recents_IsCon == "false") {
        $("#Phone-Recents-Option-Content").removeClass("Phone-Recents-Option-Show")
        $("#Phone-Recents-Option-Content").addClass("Phone-Recents-Option-Hide")
        $("#Phone-Recents-Option-Blur-Back").removeClass("Phone-Recents-Option-Blur-Back-Show").addClass("Phone-Recents-Option-Blur-Back-Hide")
        const This_Recents_Number = $("#Recents-Content-Box-Name-" + This_Recents_Box_Id).text()

        $("#New-Contact-Name").val("")
        $("#New-Contact-Num").val(This_Recents_Number)
        $("#New-Contact-Fav-Switch-State").text("Off")
        $("#New-Contact-Fav-Switch-Img-Inner").attr("fill", "var(--Fav-I-C)")
        New_Contact_Has_Name_And_Num = false
        New_Is_Fav = false
        New_Contact_Name = ""
        New_Contact_Num = ""
        Add_Before_Section = "Recents"

        $("#New-Contact").removeClass().addClass("Show-New-Contact")
    } else if (This_Recents_IsCon == "true") {
        if (debug) {
            console.log("Already A Contact")
        }
    }
})

$(document).on("click", "#Phone-Recents-Option-Fav", function() {
    if (This_Recents_IsCon == "true") {
        if (This_Recents_IsFav == "false") {
            $("#Phone-Recents-Option-Content").removeClass("Phone-Recents-Option-Show").addClass("Phone-Recents-Option-Hide")
            $("#Phone-Recents-Option-Blur-Back").removeClass("Phone-Recents-Option-Blur-Back-Show").addClass("Phone-Recents-Option-Blur-Back-Hide")

            $.post("https://cc_phone/editContact", JSON.stringify({
                id: This_Recents_Box_ContactDbId,
                index: This_Recents_Box_Contact - 1,
                name: This_Recents_Name,
                number: This_Recents_Number,
                favorite: true
            })).done(() => {
                setTimeout(() => {
                    Load_Recents()
                }, 100)
            })
        } else if (This_Recents_IsFav == "true") {
            $("#Phone-Recents-Option-Content").removeClass("Phone-Recents-Option-Show").addClass("Phone-Recents-Option-Hide")
            $("#Phone-Recents-Option-Blur-Back").removeClass("Phone-Recents-Option-Blur-Back-Show").addClass("Phone-Recents-Option-Blur-Back-Hide")

            $.post("https://cc_phone/editContact", JSON.stringify({
                id: This_Recents_Box_ContactDbId,
                index: This_Recents_Box_Contact - 1,
                name: This_Recents_Name,
                number: This_Recents_Number,
                favorite: false
            }))

            Load_Recents()
        } else if (This_Recents_IsFav == "true") {
            print('is already fav')
        }
    } else if (This_Recents_IsCon == "false") {
        if (debug) {
            console.log("Not Even A Contact")
        }
    }
})

$(document).on("click", "#Phone-Recents-Option-Del", function() {
    $("#Phone-Recents-Option-Content").removeClass("Phone-Recents-Option-Show").addClass("Phone-Recents-Option-Hide")
    $("#Phone-Recents-Option-Blur-Back").removeClass("Phone-Recents-Option-Blur-Back-Show").addClass("Phone-Recents-Option-Blur-Back-Hide")

    $.post("https://cc_phone/deleteRecent", JSON.stringify({
        id: This_Recents_Box_DbId,
        index: This_Recents_Box_DataId - 1
    }))

    Load_Recents()
})

$(document).on("click", "#Phone-Recents-Option-Close", function() {
    $("#Phone-Recents-Option-Content").removeClass("Phone-Recents-Option-Show").addClass("Phone-Recents-Option-Hide")
    $("#Phone-Recents-Option-Blur-Back").removeClass("Phone-Recents-Option-Blur-Back-Show").addClass("Phone-Recents-Option-Blur-Back-Hide")
})

$(document).on("click", "#Call-End", function() {
    const Caller_Name = $("#Call-Number-Text").text()
    $("#Call").removeClass().addClass("Call-Hide-Call")

    IphoneRing.pause()
    IphoneRing.currentTime = 0

    $.post("https://cc_phone/declineCall", JSON.stringify({
        number: Incoming_Call,
        callFrequenz: callFrequenz
    }))

    clearInterval(Call_Timer)

    setTimeout(function() {
        $("#Call-Timer").text("0:00")
    }, 400)

    if (Call_Before_Section == "Menu") {
    } else if (Call_Before_Section == "Phone") {
        $("#Phone").removeClass().addClass("Call-Show-Phone")
    } else if (Call_Before_Section == "Contacts") {
        $("#Contacts").removeClass().addClass("Call-Show-Contacts")
    } else if (Call_Before_Section == "Business") {
        $("#Business").removeClass().addClass("Call-Show-Business")
    }

    setTimeout(function() {
        $("#Call-Back-Transition").css("display", "none")
    }, 300)
})

function Close_Active_Contacts_Box() {
    $(".Contacts-Content-Box-Btn").removeClass("Contacts-Content-Box-Btn-Show").removeClass("Contacts-Content-Box-Btn-Hide")
    $(".Contacts-Content-Box-Name").removeClass("Contacts-Content-Box-Name-Show").removeClass("Contacts-Content-Box-Name-Hide")
    $(".Contacts-Content-Box-Num").removeClass("Contacts-Content-Box-Num-Show").removeClass("Contacts-Content-Box-Num-Hide")
    $(".Contacts-Content-Box").removeClass("Contacts-Content-Box-Activate")

    setTimeout(function() {
        $(".Contacts-Action-Box").removeClass("Contacts-Action-Box-Show").removeClass("Contacts-Action-Box-Hide")
    }, 270)
}

function Close_Active_Business_Box() {
    $(".Business-Content-Box-Btn").removeClass("Business-Content-Box-Btn-Show").removeClass("Business-Content-Box-Btn-Hide")
    $(".Business-Content-Box-Name").removeClass("Business-Content-Box-Name-Show").removeClass("Business-Content-Box-Name-Hide")
    $(".Business-Content-Box-Num").removeClass("Business-Content-Box-Num-Show").removeClass("Business-Content-Box-Num-Hide")
    $(".Business-Content-Box").removeClass("Business-Content-Box-Activate")

    setTimeout(function() {
        $(".Business-Action-Box").removeClass("Business-Action-Box-Show").removeClass("Business-Action-Box-Hide")
    }, 270)
}

$(document).on("click", "#Call-Click-Back", function() {
    const You_Cant_Close_Call = true

    if (You_Cant_Close_Call == true) {
        New_Notification("Phone", "Phone", "Phone", "Beende dein Anruf erst!", "Jetzt")
    } else if (You_Cant_Close_Call == false) {
        if (Call_Before_Section == "Contacts") {
            Close_Active_Contacts_Box()
        } else if (Call_Before_Section == "Business") {
            Close_Active_Business_Box()
        }

        $("#Call").removeClass().addClass("Hide-Phone")

        setTimeout(function() {
            $("#Call").removeClass("Hide-Phone")
        }, 400)

        clearInterval(Call_Timer)

        $("#Call-Back-Transition").css("display", "none")

        setTimeout(function() {
            $("#Call-Timer").text("0:00")
        }, 400)
    }
})

$(document).on("click", "#Call-Mute", function() {
    if (Call_Is_Mute == false) {
        $("#Call-Mute-Off").css("opacity", "1")
        $("#Call-Mute-On").css("opacity", "0")
        $("#Call-Mute-Text").text("UnMute")

        Call_Is_Mute = true
    } else if (Call_Is_Mute == true) {
        $("#Call-Mute-Off").css("opacity", "0")
        $("#Call-Mute-On").css("opacity", "1")
        $("#Call-Mute-Text").text("Mute")

        Call_Is_Mute = false
    }
})

function Load_Contacts_Contents(Con_DataId, Con_Id, Con_Name, Con_Num, Con_IsFav) {
    const contactItem = `
        <div id="Contacts-Content-Box-${Con_Id}" class="Contacts-Content-Box" data-nickname="${Con_Name}">
            <div id="Contacts-Content-Box-Btn-${Con_Id}" class="Contacts-Content-Box-Btn"></div>
            <div id="Contacts-Content-Box-Name-${Con_Id}" class="Contacts-Content-Box-Name">${Con_Name}</div>
            <div id="Contacts-Content-Box-Num-${Con_Id}" class="Contacts-Content-Box-Num">${Con_Num}</div>
            <div id="Contacts-Content-Box-IsFav-${Con_Id}" class="Contacts-Content-Box-IsFav">${Con_IsFav}</div>
            <div id="Contacts-Content-Box-DataId-${Con_Id}" class="Contacts-Content-Box-DataId">${Con_DataId}</div>
            <div id="Contacts-Content-Box-Line-${Con_Id}" class="Contacts-Content-Box-Line"></div>

            <div id="Contacts-Content-Action-Box-${Con_Id}" class="Contacts-Action-Box">
                <div id="Contacts-Action-Call-${Con_Id}" class="Contacts-Action-Content">
                    <div id="Contacts-Action-Call-Btn-${Con_Id}" class="Contacts-Action-Call"></div>
                    
                    <svg id="Contacts-Action-Call-Img-${Con_Id}" class="Contacts-Action-Img call_text_31131323" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.000000 44.000000" height="2vh" width="2vh">
                        <g xmlns="http://www.w3.org/2000/svg" transform="translate(0,44) scale(0.1,-0.1)" fill="var(--Icons-A-C)"><path d="M53 445 c-45 -32 -41 -124 9 -202 71 -109 192 -205 276 -219 47 -7 97 9 112 37 20 37 11 56 -45 95 l-55 38 -30 -22 c-16 -12 -33 -22 -39 -22 -14 0 -105 85 -120 113 -12 23 -11 29 9 57 l22 31 -37 55 c-40 58 -63 67 -102 39z" /></g>
                    </svg>

                    <p id="Contacts-Action-Call-Text-${Con_Id}" class="Contacts-Action-Text call_text_31131323">Call</p>
                </div>

                <div id="Contacts-Action-Message" class="Contacts-Action-Content">
                    <div id="Contacts-Action-Message-Btn-${Con_Id}" class="Contacts-Action-Message"></div>

                    <svg id="Contacts-Action-Message-Img-${Con_Id}" class="Contacts-Action-Img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.000000 44.000000" height="2vh" width="2vh">
                        <g xmlns="http://www.w3.org/2000/svg" transform="translate(0,44) scale(0.1,-0.1)" fill="var(--Icons-A-C)"><path d="M152 418 c-18 -6 -52 -28 -76 -49 -80 -71 -80 -159 0 -236 24 -24 44 -45 44 -49 0 -3 -9 -19 -21 -35 l-20 -29 21 0 c11 0 40 10 63 22 23 12 72 28 109 34 91 16 150 52 177 107 27 55 26 82 -1 137 -34 67 -100 104 -192 107 -39 1 -86 -3 -104 -9z" /></g>
                    </svg>

                    <p id="Contacts-Action-Message-Text-${Con_Id}" class="Contacts-Action-Text">Message</p>
                </div>

                <div id="Contacts-Action-Edit" class="Contacts-Action-Content">
                    <div id="Contacts-Action-Edit-Btn-${Con_Id}" class="Contacts-Action-Edit"></div>
                
                    <svg id="Contacts-Action-Edit-Img-${Con_Id}" class="Contacts-Action-Img" xmlns="http://www.w3.org/2000/svg" width="2vh" height="2vh" viewBox="0 0 48 48">
                        <g transform="translate(0,48) scale(0.1,-0.1)" fill="var(--Icons-A-C)">
                            <path d="M17 463 c-4 -3 -7 -104 -7 -224 0 -206 1 -219 19 -229 12 -6 101 -10 220 -10 245 0 231 -10 231 159 l0 115 -30 -29 c-28 -27 -30 -33 -30 -107 l0 -78 -180 0 -180 0 0 180 0 180 78 0 c71 0 81 2 102 25 l23 25 -120 0 c-66 0 -123 -3 -126 -7z" />
                            <path d="M384 459 c-10 -17 67 -91 82 -78 14 12 7 47 -14 72 -17 19 -57 23 -68 6z" />
                            <path d="M251 326 l-92 -92 39 -41 39 -41 93 93 c87 87 92 94 78 114 -8 11 -26 29 -39 40 l-26 20 -92 -93z" />
                            <path d="M116 193 c-3 -3 -6 -24 -6 -45 l0 -38 45 0 c51 0 54 6 24 44 -23 30 -53 48 -63 39z" />
                        </g>
                    </svg>

                    <p id="Contacts-Action-Edit-Text-${Con_Id}" class="Contacts-Action-Text">Edit</p>
                </div>
            </div>
        </div>

        <div id="Contacts-Space-From-Bottom"></div>
    `

    $("#Contacts-Space-From-Bottom").remove()
    $("#Contacts-Contents").append(contactItem)
}

function Load_Contacts_User(Con_U_Name, Con_U_Type) {
    const contactUserItem = `
        <div id="Contacts-User-Field" class="Contacts-Content-Box">
            <div id="Contacts-User-Field-Line" class="User-Field-Line"></div>
        
            <div class="User-Field-Avatar">
                <div class="User-Field-Avatar-Text">${Con_U_Name.charAt(0).toUpperCase()}</div>
            </div>

            <div class="User-Field-Name">${Con_U_Name}</div>
            <div class="User-Field-Info">${Con_U_Type}</div>
        </div>
    `

    $("#Contacts-Space-From-Bottom").remove()
    $("#Contacts-Contents").append(contactUserItem)
}

// KONTAKTE

$(document).on("click", "#D-App-3", (Load_Contacts = function Load_Contacts() {
    currentApp = 'Contact'
    $(".Contacts-Content-Box").remove()
    Load_Contacts_User(myRpName, myNumber)

    $.post("https://cc_phone/getContacts").done((contacts) => {
        test = []

        contacts.forEach((contact, index) => {
            test.push({
                index: index,
                id: contact.id,
                name: contact.name,
                number: contact.number,
                favorite: contact.favorite,
                delete: contact.delete,
                avatar: contact.avatar
            })
        })

        test.sort(function(a, b) {
            var a1 = typeof a.name, b1 = typeof b.name
            return a1 < b1 ? -1 : a1 > b1 ? 1 : a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        })

        test.forEach((contact) => {
            Load_Contacts_Contents(contact.id, contact.index, contact.name, contact.number, contact.favorite)
        })
    })

    if (!$("#Contacts").hasClass("Call-Show-Contacts")) {
        $("#Contacts").removeClass().addClass("Show-App")
    }
}))


$(document).on('keyup', '#Contacts-Search-Bar-Textbox', function() {
    const inputText = $(this).val()

    $(".Contacts-Content-Box").each(function() {
        const get = $(this).attr("data-nickname")
        
        if (get == undefined) {
            return
        }
        
        if (!get.includes(inputText)) {
            $(this).hide()
        } else {
            $(this).show()
        }
    })
})

$(document).on("click", "#Contacts-Click-Back", (Contacts_Back = function Contacts_Back() {
    currentApp = 'Home'

    $("#Contacts").removeClass().addClass("Hide-App")
    $(".Contacts-Content-Box-Btn").removeClass("Contacts-Content-Box-Btn-Show").removeClass("Contacts-Content-Box-Btn-Hide")
    $(".Contacts-Content-Box-Name").removeClass("Contacts-Content-Box-Name-Show").removeClass("Contacts-Content-Box-Name-Hide")
    $(".Contacts-Content-Box-Num").removeClass("Contacts-Content-Box-Num-Show").removeClass("Contacts-Content-Box-Num-Hide")
    $(".Contacts-Content-Box").removeClass("Contacts-Content-Box-Activate")
    
    setTimeout(function() {
        $(".Contacts-Action-Box").removeClass("Contacts-Action-Box-Show").removeClass("Contacts-Action-Box-Hide")
    }, 270)
}))

$(document).on("click", "#Contacts-Top-Field-Back", function() {
    Contacts_Back()
})

$(document).on("click", ".Contacts-Content-Box-Btn", function() {
    This_Contact_Box = "#" + $(this).parent().attr("id")
    This_Contact_Id = This_Contact_Box.split("-").pop()
    const This_Contact_Name = $(This_Contact_Box + " #Contacts-Content-Box-Name-" + This_Contact_Id).text()

    if ($(This_Contact_Box).hasClass("Contacts-Content-Box-Activate")) {
        $(This_Contact_Box).removeClass("Contacts-Content-Box-Activate")

        $("#Contacts-Content-Action-Box" + "-" + This_Contact_Id).removeClass("Contacts-Action-Box-Show").addClass("Contacts-Action-Box-Hide")
        
        setTimeout(function() {
            $("#Contacts-Content-Action-Box" + "-" + This_Contact_Id).removeClass("Contacts-Action-Box-Hide")
        }, 270)
        
        $(This_Contact_Box + " .Contacts-Content-Box-Btn").removeClass("Contacts-Content-Box-Btn-Show")
        $(This_Contact_Box + " .Contacts-Content-Box-Name").removeClass("Contacts-Content-Box-Name-Show")
        $(This_Contact_Box + " .Contacts-Content-Box-Num").removeClass("Contacts-Content-Box-Num-Show")
    } else {
        $(".Contacts-Content-Box-Btn").removeClass("Contacts-Content-Box-Btn-Show")
        $(This_Contact_Box + " .Contacts-Content-Box-Btn").addClass("Contacts-Content-Box-Btn-Show")

        $(".Contacts-Content-Box-Name").removeClass("Contacts-Content-Box-Name-Show")
        $(This_Contact_Box + " .Contacts-Content-Box-Name").addClass("Contacts-Content-Box-Name-Show")

        $(".Contacts-Content-Box-Num").removeClass("Contacts-Content-Box-Num-Show")
        $(This_Contact_Box + " .Contacts-Content-Box-Num").addClass("Contacts-Content-Box-Num-Show")

        $(".Contacts-Content-Box").removeClass("Contacts-Content-Box-Activate")
        $(This_Contact_Box).addClass("Contacts-Content-Box-Activate")

        $(".Contacts-Action-Box-Show").removeClass("Contacts-Action-Box-Show").addClass("Contacts-Action-Box-Hide")

        setTimeout(function() {
            $(".Contacts-Action-Box-Hide").removeClass("Contacts-Action-Box-Hide")
        }, 270)

        $(This_Contact_Box + " #Contacts-Content-Action-Box" + "-" + This_Contact_Id).addClass("Contacts-Action-Box-Show")
    }
})

$(document).on("click", ".call_text_31131323", function() {
    var This_Contact_Name_Text = $(This_Contact_Box + " #Contacts-Content-Box-Name-" + This_Contact_Id).text()
    $("#Call-Number-Text").text(This_Contact_Name_Text)
    var Number_To_Call = $("#Contacts-Content-Box-Num-" + This_Contact_Id).text()
    Incoming_Call = Number_To_Call

    $.post("https://cc_phone/attemptCall", JSON.stringify({
        number: Number_To_Call
    })).done((data) => {
        if (!data.state) {
            if (data.text != null) {
                New_Notification("Phone", "Phone", "Telefon", data.text)
            }
        } else {
            callFrequenz = data.text
        }
    })

    clearInterval(Call_Timer)

    setTimeout(function() {
        $("#Call-Timer").text("Wird Angerufen")
    }, 400)

    $("#Contacts").removeClass("Show-Contacts").addClass("Call-Hide-Contacts")
    $("#Call").removeClass().addClass("Call-Show-Phone")
    $("#Call-Back-Transition").css("display", "block")

    Call_Is_Mute = false
    $("#Call-Mute-Off").css("opacity", "0")
    $("#Call-Mute-On").css("opacity", "1")
    $("#Call-Mute-Text").text("Mute")

    Call_Before_Section = "Contacts"
})

$(document).on("click", ".Contacts-Action-Message", function() {
    This_Messages_Box = "#" + $(this).attr("id")
    This_Messages_Id = This_Messages_Box.split("-").pop()
    This_Messages_Name = $("#Contacts-Content-Box-Name-" + This_Messages_Id).text()
    This_Messages_DataId = $("#Contacts-Content-Box-DataId-" + This_Messages_Id).text()
    This_Messages_Number = $("#Contacts-Content-Box-Num-" + This_Messages_Id).text()

    var All_UnRead_Mes = 0
    This_Messages_Number = This_Messages_Number
    Last_Message_Id = 1
    Last_Message_DataId = 6

    isInChat = true

    $(".Messaging-Box").remove()
    $("#Messaging-Space-From-Top").remove()
    $("#Messaging-Contents").append('<div id="Messaging-Space-From-Top"></div>')

    $.post("https://cc_phone/getChat", JSON.stringify({
        number: This_Messages_Number
    })).done((data) => {
        Load_Messaging_TopField(This_Messages_DataId, This_Messages_Name, data.avatar, All_UnRead_Mes.toString())

        if (data.isInContacts) {
            isInContacts = true
        } else {
            isInContacts = false
        }

        data.messages.forEach((message, index) => {
            index = index
            
            const date = new Date(message.date * 1000)

            const hours = checkTime(date.getHours())
            const minutes = checkTime(date.getMinutes())

            if (message.coords) {
                if (message.coords[0] && message.coords[1]) {
                    Load_Messaging_Contents(Last_Message_DataId, Last_Message_Id, 'Location: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', message.type, `${hours}:${minutes}`, message.coords[0], message.coords[1])
                    Last_Message_Id++
                    Last_Message_DataId++
                    return
                }
            }

            Load_Messaging_Contents(Last_Message_DataId, Last_Message_Id, message.msg, message.type, `${hours}:${minutes}`)
            Last_Message_Id++
            Last_Message_DataId++
        })

        var element = document.getElementById("Messaging-Contents")
        element.scrollTop = element.scrollHeight
    })

    $("#Messaging").removeClass().addClass("Show-Messaging")
    var element = document.getElementById("Messaging-Contents")
    element.scrollTop = element.scrollHeight

    Messaging_Before_Section = "Contacts"
})

$(document).on("click", ".Contacts-Action-Edit", function() {
    Edit_Contact_Name = $("#Contacts-Content-Box-Name-" + This_Contact_Id).text()
    Edit_Contact_Num = $("#Contacts-Content-Box-Num-" + This_Contact_Id).text()
    var Edit_Contact_Avatar = Edit_Contact_Name.charAt(0).toUpperCase()
    Edit_Contact_DataId = $("#Contacts-Content-Box-DataId-" + This_Contact_Id).text()
    var Edit_Contact_Name_IsFav = $("#Contacts-Content-Box-IsFav-" + This_Contact_Id).text()

    $("#Edit-Contact-Name").val(Edit_Contact_Name)
    $("#Edit-Contact-Num").val(Edit_Contact_Num)
    $("#Edit-Contact-Avatar-Text").text(Edit_Contact_Avatar)

    if (Edit_Contact_Name_IsFav == "false") {
        Edit_Is_Fav = false
        $("#Edit-Contact-Fav-Switch-State").text("Off")
        $("#Edit-Contact-Fav-Switch-Img-Inner").attr("fill", "var(--Fav-I-C)")
    } else if (Edit_Contact_Name_IsFav == "true") {
        Edit_Is_Fav = true
        $("#Edit-Contact-Fav-Switch-State").text("On")
        $("#Edit-Contact-Fav-Switch-Img-Inner").attr("fill", "var(--Fav-O-C)")
    }

    $("#Edit-Contact").removeClass().addClass("Show-Edit-Contact")

    Edit_Check_Fields()
})

$(document).on("click", "#Contacts-Top-Field-Right", function() {
    $("#New-Contact-Name").val("")
    $("#New-Contact-Num").val("")
    $("#Edit-Contact-Avatar-Text").text("")
    $("#New-Contact-Fav-Switch-State").text("Off")
    $("#New-Contact-Fav-Switch-Img-Inner").attr("fill", "var(--Fav-I-C)")
    New_Contact_Has_Name_And_Num = false
    New_Is_Fav = false
    New_Contact_Name = ""
    New_Contact_Num = ""
    Add_Before_Section = "Contacts"
    $("#New-Contact").removeClass().addClass("Show-New-Contact")
})

$(document).on("click", "#New-Contact-Top-Field-Right", function() {
    if (New_Contact_Has_Name_And_Num == true) {
        $.post("https://cc_phone/addContact", JSON.stringify({
            name: New_Contact_Name,
            number: New_Contact_Num,
            favorite: New_Is_Fav,
        }))

        Close_New_Contact()
    }
})

$(document).on("click", "#New-Contact-Top-Field-Left", (Close_New_Contact = function Close_New_Contact() {
    $("#New-Contact").removeClass().addClass("Hide-New-Contact")

    switch (Add_Before_Section) {
        case 'Contacts':
            setTimeout(() => {
                Load_Contacts()
            }, 100)
        break
        case 'Phone_Dial':
            Show_Number_Pad()
        break
        case 'Recents':
            Load_Recents()
        break
        case 'Messaging':
        break
    }
}))

$(document).on("click", "#New-Contact-Click-Back", function() {
    $("#New-Contact").removeClass().addClass("Hide-New-Contact")

    switch (Add_Before_Section) {
        case 'Contacts':
            $("#Contacts").removeClass()
        break
        case 'Phone_Dial':
            $("#Phone").removeClass()
        break
        case 'Recents':
            $("#Phone").removeClass()
        break
        case 'Messaging':
            $("#Phone").removeClass()
        break
    }
})

$("#New-Contact-Name").bind("input propertychange", (New_Check_Fields = function New_Check_Fields() {
    New_Contact_Name = $("#New-Contact-Name").val()
    New_Contact_Num = $("#New-Contact-Num").val()

    $("#New-Contact-Avatar-Text").text(New_Contact_Name.charAt(0).toUpperCase())

    if (!New_Contact_Name == "" && !New_Contact_Num == "") {
        New_Contact_Has_Name_And_Num = true
        $("#New-Contact-Top-Field-Right").removeClass("Disabled-Text-Field")
        $("#New-Contact-Top-Field-Right-Text").css("color", "var(--Texts-A-C)")
    } else {
        New_Contact_Has_Name_And_Num = false
        $("#New-Contact-Top-Field-Right").addClass("Disabled-Text-Field")
        $("#New-Contact-Top-Field-Right-Text").css("color", "var(--Texts-D-C)")
    }
}))

$("#New-Contact-Num").bind("input propertychange", function() {
    New_Check_Fields()
})

$(document).on("click", "#New-Contact-Fav-Box", function() {
    const New_Fav_State = $("#New-Contact-Fav-Switch-State").text()

    if (New_Fav_State == "Off") {
        New_Is_Fav = true
        $("#New-Contact-Fav-Switch-State").text("On")
        $("#New-Contact-Fav-Switch-Img-Inner").attr("fill", "var(--Fav-O-C)")
    } else if (New_Fav_State == "On") {
        New_Is_Fav = false
        $("#New-Contact-Fav-Switch-State").text("Off")
        $("#New-Contact-Fav-Switch-Img-Inner").attr("fill", "var(--Fav-I-C)")
    }
})

$(document).on("click", "#Edit-Contact-Top-Field-Left", (Close_Edit_Contact = function Close_Edit_Contact() {
    $("#Edit-Contact").removeClass().addClass("Hide-Edit-Contact")
    Load_Contacts()
}))

$(document).on("click", "#Edit-Contact-Top-Field-Right", function() {
    if (Edit_Contact_Has_Name_And_Num == true) {

        $.post("https://cc_phone/editContact", JSON.stringify({
            id: Edit_Contact_DataId,
            index: This_Contact_Id,
            name: $("#Edit-Contact-Name").val(),
            number: $("#Edit-Contact-Num").val(),
            favorite: Edit_Is_Fav,
        }))

        Close_Edit_Contact()
    }
})

$(document).on("click", "#Edit-Contact-Click-Back", function() {
    $("#Edit-Contact").removeClass().addClass("Hide-Edit-Contact")
    $("#Contacts").removeClass()
})

$("#Edit-Contact-Name").bind("input propertychange", (Edit_Check_Fields = function Edit_Check_Fields() {
    Edit_Contact_Name = $("#Edit-Contact-Name").val()
    Edit_Contact_Num = $("#Edit-Contact-Num").val()

    $("#Edit-Contact-Avatar-Text").text(Edit_Contact_Name.charAt(0).toUpperCase())

    if (Edit_Contact_Name == "" || Edit_Contact_Num == "") {
        Edit_Contact_Has_Name_And_Num = false
        $("#Edit-Contact-Top-Field-Right").addClass("Disabled-Text-Field")
        $("#Edit-Contact-Top-Field-Right-Text").css("color", "var(--Texts-D-C)")
    } else {
        Edit_Contact_Has_Name_And_Num = true
        $("#Edit-Contact-Top-Field-Right").removeClass("Disabled-Text-Field")
        $("#Edit-Contact-Top-Field-Right-Text").css("color", "var(--Texts-A-C)")
    }
}))

$("#Edit-Contact-Num").bind("input propertychange", function() {
    Edit_Check_Fields()
})

$(document).on("click", "#Edit-Contact-Fav-Box", function() {
    const Edit_Fav_State = $("#Edit-Contact-Fav-Switch-State").text()

    if (Edit_Fav_State == "Off") {
        Edit_Is_Fav = true
        $("#Edit-Contact-Fav-Switch-State").text("On")
        $("#Edit-Contact-Fav-Switch-Img-Inner").attr("fill", "var(--Fav-O-C)")
    } else if (Edit_Fav_State == "On") {
        Edit_Is_Fav = false
        $("#Edit-Contact-Fav-Switch-State").text("Off")
        $("#Edit-Contact-Fav-Switch-Img-Inner").attr("fill", "var(--Fav-I-C)")
    }
})

$(document).on("click", "#Edit-Contact-Delete-Box", function() {
    $.post('https://cc_phone/deleteContact', JSON.stringify({
        id: Edit_Contact_DataId,
        index: This_Contact_Id
    }))

    Close_Edit_Contact()
})

$(document).on("click", "#Edit-Contact-Block-Box", function() {
    $.post('https://cc_phone/blockContact', JSON.stringify({
        id: Edit_Contact_DataId,
        index: This_Contact_Id
    }))

    Close_Edit_Contact()
})

function Load_Messages_Contents(Mes_DataId, Mes_Id, Mes_Name, Mes_Last, Mes_Time, Mes_IsRead, avatar) {
    const messageItem = `
        <div id="Messages-Content-Box-${Mes_Id}" class="Messages-Content-Box" data-nickname="${Mes_Name}">
            <div id="Messages-Content-Box-Read-${Mes_Id}" class="Messages-Content-Box-${Mes_IsRead}"></div>
            ${avatar == "default" ? `
            <div id="Messages-Content-Box-Avatar-${Mes_Id}" class="Messages-Content-Box-Avatar">
                <svg id="Messages-Content-Box-Avatar-Img-${Mes_Id}" class="Messages-Content-Box-Avatar-Img" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.6vh" height="3vh" viewBox="0 0 26 30">
                    <g fill="var(--Icons-C)" stroke="none" transform="translate(0,30) scale(0.1,-0.1)">
                        <path d="M80 280 c-27 -27 -27 -93 0 -120 30 -30 83 -27 109 6 27 34 27 74 0 108 -26 33 -79 36 -109 6z"/>
                        <path d="M32 99 c-19 -13 -32 -28 -30 -38 4 -22 85 -61 128 -61 42 0 118 33 126 54 22 57 -151 91 -224 45z"/>
                    </g>
                </svg>
            </div>
            ` : `
            <div id="Messages-Content-Box-Avatar-Image-${Mes_Id}" class="Messages-Content-Box-Avatar-Image">
                <img id="Messages-Content-Box-Avatar-Image-Img-${Mes_Id}" class="Messages-Content-Box-Avatar-Image-Img" src="${avatar}">
            </div>
            `
            }

            <div id="Messages-Content-Box-Name-${Mes_Id}" class="Messages-Content-Box-Name">${Mes_Name}</div>
            <div id="Messages-Content-Box-Last-${Mes_Id}" class="Messages-Content-Box-Last">${Mes_Last}</div>
            <div id="Messages-Content-Box-Time-${Mes_Id}" class="Messages-Content-Box-Time">${Mes_Time}</div>
            
            <svg id="Messages-Content-Box-Icon-${Mes_Id}" class="Messages-Content-Box-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="1.2vh" height="2vh" viewBox="0 0 476 800">
                <g id="Messages-Content-Box-Img-${Mes_Id}" class="Messages-Content-Box-Img" transform="translate(0,800) scale(0.1,-0.1)">
                    <path d="M3845 7984 c-99 -22 -203 -68 -282 -124 -43 -31 -683 -664 -1750 -1732 l-1681 -1683 -51 -105 c-110 -230 -110 -450 0 -680 l51 -105 1681 -1683 c925 -926 1710 -1704 1744 -1728 135 -98 264 -138 443 -138 145 0 213 15 335 74 192 93 344 278 400 485 53 198 16 431 -97 608 -29 45 -427 450 -1421 1444 l-1382 1383 1382 1382 c994 995 1392 1400 1421 1445 113 177 150 410 97 608 -69 257 -283 470 -540 540 -88 24 -264 28 -350 9z" />
                </g>
            </svg>

            <div id="Messages-Content-Box-DataId-${Mes_Id}" class="Messages-Content-Box-DataId">${Mes_DataId}</div>
            <div id="Messages-Content-Box-Line-${Mes_Id}" class="Messages-Content-Box-Line"></div>
        </div>

        <div id="Messages-Space-From-Bottom"></div>
    `

    $("#Messages-Space-From-Bottom").remove()
    $("#Messages-Contents").append(messageItem)
}

$(document).on('keyup', '#Messages-Search-Bar-Textbox', function() {
    const inputText = $(this).val()

    $(".Messages-Content-Box").each(function() {
        const get = $(this).attr("data-nickname")
        
        if (get == undefined) {
            return
        }

        if (!get.includes(inputText)) {
            $(this).hide()
        } else {
            $(this).show()
        }
    })
})

$(document).on("click", "#D-App-2", (Load_Messages = function Load_Messages() {
    currentApp = 'Message'
    $(".Messages-Content-Box").remove()

    $.post("https://cc_phone/getMessages").done((messages) => {
        messages.forEach((message, index) => {
            index = index
            const date = new Date(message.date * 1000)
            
            if (message.msg.includes("jpg") || message.msg.includes("png")) {
                message.msg = 'Bild'
            }

            Load_Messages_Contents(index, message.number, message.author, message.msg, date.toLocaleString(), "UnRead", message.avatar)
        })
    })

    $("#Messages").removeClass().addClass("Show-App")
}))

$(document).on("click", "#Messages-Top-Field-Back", function() {
    Messages_Back()
})

$(document).on("click", "#Messages-Click-Back", (Messages_Back = function Messages_Back() {
    currentApp = 'Home'
    $("#Messages").removeClass().addClass("Hide-App")
}))

// REWORK MONKEY
function Load_Messaging_Contents(Mesing_DataId, Mesing_Id, Mesing_Text, Mesing_Type, Mesing_Time, x, y) {
    const messageItem = {
        RT:
        `
            <div id="Messaging-Box-${Mesing_Id}" class="Messaging-Box">
                <div id="Messaging-Recive-Txt-${Mesing_Id}" class="Messaging-Recive-Txt" data-Messaging_Time="${Mesing_Time}">${Mesing_Text}</div>
                <div id="Messaging-Recive-DataId-${Mesing_Id}" class="Messaging-Recive-DataId">${Mesing_DataId}</div>
                <div id="Messaging-Recive-Arrow-${Mesing_Id}" class="Messaging-Recive-Arrow">
                    <svg id="Messaging-Recive-Arrow-Icon-${Mesing_Id}" class="Messaging-Recive-Arrow-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2vh" height="2.5vh" viewBox="0 0 61 75">
                        <g id="Messaging-Recive-Arrow-Img${Mesing_Id}" class="Messaging-Recive-Arrow-Img" transform="translate(0,75) scale(0.1,-0.1)">
                            <path d="M2 528 l3 -223 34 -62 c39 -73 117 -151 187 -186 87 -44 149 -57 271 -57 118 0 133 7 68 34 -48 20 -107 78 -133 130 -34 67 -42 139 -42 374 l0 212 -196 0 -195 0 3 -222z" />
                        </g>
                    </svg>
                </div>
            </div>
            
            <div id="Messaging-Space-From-Bottom"></div>
        `,
        ST:
        `
            <div id="Messaging-Box-${Mesing_Id}" class="Messaging-Box">
                <div id="Messaging-Send-Txt-${Mesing_Id}" class="Messaging-Send-Txt" data-Messaging_Time="${Mesing_Time}">${Mesing_Text}</div>
                <div id="Messaging-Send-DataId-${Mesing_Id}" class="Messaging-Send-DataId">${Mesing_DataId}</div>
                <div id="Messaging-Send-Arrow-${Mesing_Id}" class="Messaging-Send-Arrow">
                    <svg id="Messaging-Send-Arrow-Icon-${Mesing_Id}" class="Messaging-Send-Arrow-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2vh" height="2.5vh" viewBox="0 0 61 75">
                        <g id="Messaging-Send-Arrow-Img${Mesing_Id}" class="Messaging-Send-Arrow-Img" transform="translate(0,75) scale(0.1,-0.1)">
                            <path d="M2 528 l3 -223 34 -62 c39 -73 117 -151 187 -186 87 -44 149 -57 271 -57 118 0 133 7 68 34 -48 20 -107 78 -133 130 -34 67 -42 139 -42 374 l0 212 -196 0 -195 0 3 -222z" />
                        </g>
                    </svg>
                </div>
            </div>
            <div id="Messaging-Space-From-Bottom"></div>
        `,
        RL:
        `
            <div id="Messaging-Box-${Mesing_Id}" class="Messaging-Box" data-x="${x}" data-y="${y}">
                <div id="Messaging-Recive-Txt-${Mesing_Id}" class="Messaging-Recive-Txt" data-Messaging_Time="${Mesing_Time}">Location: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div id="Messaging-Recive-DataId-${Mesing_Id}" class="Messaging-Recive-DataId">${Mesing_DataId}</div>
                <div id="Messaging-Recive-Loc-Address-${Mesing_Id}" class="Messaging-Recive-Loc-Address">${Mesing_Text}</div>
                <div id="Messaging-Recive-Loc-${Mesing_Id}" class="Messaging-Recive-Loc">
                    <svg id="Messaging-Recive-Loc-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.4vh" height="4vh" viewBox="0 0 586 978">
                        <g id="Messaging-Recive-Loc-Img" transform="translate(0,978) scale(0.1,-0.1)">
                            <path d="M2765 9768 c-573 -26 -1154 -239 -1620 -591 -746 -565 -1172 -1453 -1142 -2382 10 -296 72 -627 170 -906 26 -75 557 -1215 1397 -3005 745 -1586 1357 -2883 1360 -2883 5 0 2627 5574 2699 5737 199 451 275 1036 201 1547 -134 922 -699 1720 -1521 2149 -484 253 -982 361 -1544 334z m426 -1791 c364 -95 648 -384 741 -753 32 -128 32 -360 0 -488 -79 -314 -306 -581 -599 -706 -135 -57 -230 -74 -403 -74 -173 0 -268 17 -403 74 -233 100 -442 307 -542 538 -61 140 -79 236 -79 412 0 172 17 269 73 401 113 270 374 505 646 584 179 53 393 57 566 12z" />
                        </g>
                    </svg>
                </div>

                <div id="Messaging-Recive-Arrow-${Mesing_Id}" class="Messaging-Recive-Arrow">
                    <svg id="Messaging-Recive-Arrow-Icon-${Mesing_Id}" class="Messaging-Recive-Arrow-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2vh" height="2.5vh" viewBox="0 0 61 75">
                        <g id="Messaging-Recive-Arrow-Img${Mesing_Id}" class="Messaging-Recive-Arrow-Img" transform="translate(0,75) scale(0.1,-0.1)">
                            <path d="M2 528 l3 -223 34 -62 c39 -73 117 -151 187 -186 87 -44 149 -57 271 -57 118 0 133 7 68 34 -48 20 -107 78 -133 130 -34 67 -42 139 -42 374 l0 212 -196 0 -195 0 3 -222z" />
                        </g>
                    </svg>
                </div>
            </div>

            <div id="Messaging-Space-From-Bottom"></div>
        `,
        SL:
        `
            <div id="Messaging-Box-${Mesing_Id}" class="Messaging-Box" data-x="${x}" data-y="${y}">
            <div id="Messaging-Send-Txt-${Mesing_Id}" class="Messaging-Send-Txt" data-Messaging_Time="${Mesing_Time}">Location: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div id="Messaging-Send-DataId-${Mesing_Id}" class="Messaging-Send-DataId">${Mesing_DataId}</div>
            <div id="Messaging-Send-Loc-Address-${Mesing_Id}" class="Messaging-Send-Loc-Address">${Mesing_Text}</div>
            <div id="Messaging-Send-Loc-${Mesing_Id}" class="Messaging-Send-Loc">
                <svg id="Messaging-Send-Loc-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.4vh" height="4vh" viewBox="0 0 586 978">
                    <g id="Messaging-Send-Loc-Img" transform="translate(0,978) scale(0.1,-0.1)">
                        <path d="M2765 9768 c-573 -26 -1154 -239 -1620 -591 -746 -565 -1172 -1453 -1142 -2382 10 -296 72 -627 170 -906 26 -75 557 -1215 1397 -3005 745 -1586 1357 -2883 1360 -2883 5 0 2627 5574 2699 5737 199 451 275 1036 201 1547 -134 922 -699 1720 -1521 2149 -484 253 -982 361 -1544 334z m426 -1791 c364 -95 648 -384 741 -753 32 -128 32 -360 0 -488 -79 -314 -306 -581 -599 -706 -135 -57 -230 -74 -403 -74 -173 0 -268 17 -403 74 -233 100 -442 307 -542 538 -61 140 -79 236 -79 412 0 172 17 269 73 401 113 270 374 505 646 584 179 53 393 57 566 12z" />
                    </g>
                </svg>
            </div>

            <div id="Messaging-Send-Arrow-${Mesing_Id}" class="Messaging-Send-Arrow">
                <svg id="Messaging-Send-Arrow-Icon-${Mesing_Id}" class="Messaging-Send-Arrow-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2vh" height="2.5vh" viewBox="0 0 61 75">
                    <g id="Messaging-Send-Arrow-Img${Mesing_Id}" class="Messaging-Send-Arrow-Img" transform="translate(0,75) scale(0.1,-0.1)">
                        <path d="M2 528 l3 -223 34 -62 c39 -73 117 -151 187 -186 87 -44 149 -57 271 -57 118 0 133 7 68 34 -48 20 -107 78 -133 130 -34 67 -42 139 -42 374 l0 212 -196 0 -195 0 3 -222z" />
                    </g>
                </svg>
            </div>
        </div>

        <div id="Messaging-Space-From-Bottom"></div>
        `,
        RI:
        `
            <div id="Messaging-Box-${Mesing_Id}" class="Messaging-Box">
                <div id="Messaging-Send-Icon-${Mesing_Id}" class="Messaging-Recive-Icon" data-Messaging_Time="${Mesing_Time}">
                    <img class="Messaging-Send-Img" src="${Mesing_Text}">
                </div>

                <div id="Messaging-Recive-Arrow-${Mesing_Id}" class="Messaging-Recive-Arrow">
                    <svg id="Messaging-Recive-Arrow-Icon-${Mesing_Id}" class="Messaging-Recive-Arrow-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2vh" height="2.5vh" viewBox="0 0 61 75">
                        <g id="Messaging-Recive-Arrow-Img-${Mesing_Id}" class="Messaging-Recive-Arrow-Img" transform="translate(0,75) scale(0.1,-0.1)">
                            <path d="M2 528 l3 -223 34 -62 c39 -73 117 -151 187 -186 87 -44 149 -57 271 -57 118 0 133 7 68 34 -48 20 -107 78 -133 130 -34 67 -42 139 -42 374 l0 212 -196 0 -195 0 3 -222z" />
                        </g>
                    </svg>
                </div>
            </div>

            <div id="Messaging-Space-From-Bottom"></div>
        `,
        SI:
        `
            <div id="Messaging-Box-${Mesing_Id}" class="Messaging-Box">
                <div id="Messaging-Send-Icon-${Mesing_Id}" class="Messaging-Send-Icon" data-Messaging_Time="${Mesing_Time}">
                    <img class="Messaging-Send-Img" src="${Mesing_Text}">
                </div>
            
                <div id="Messaging-Send-Arrow-${Mesing_Id}" class="Messaging-Send-Arrow">
                    <svg id="Messaging-Send-Arrow-Icon-${Mesing_Id}" class="Messaging-Send-Arrow-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2vh" height="2.5vh" viewBox="0 0 61 75">
                        <g id="Messaging-Send-Arrow-Img-${Mesing_Id}" class="Messaging-Send-Arrow-Img" transform="translate(0,75) scale(0.1,-0.1)">
                            <path d="M2 528 l3 -223 34 -62 c39 -73 117 -151 187 -186 87 -44 149 -57 271 -57 118 0 133 7 68 34 -48 20 -107 78 -133 130 -34 67 -42 139 -42 374 l0 212 -196 0 -195 0 3 -222z"></path>
                        </g>
                    </svg>
                </div>
            </div>

            <div id="Messaging-Space-From-Bottom"></div>
        `
    }

    $("#Messaging-Space-From-Bottom").remove()

    if (Mesing_Type == "RT") {
        $("#Messaging-Contents").append(messageItem.RT)
    } else if (Mesing_Type == "ST") { 
        $("#Messaging-Contents").append(messageItem.ST)
    } else if (Mesing_Type == "RL") {
        $("#Messaging-Contents").append(messageItem.RL)
    } else if (Mesing_Type == "SL") {
        $("#Messaging-Contents").append(messageItem.SL)
    }else if (Mesing_Type == "RI") {
        $("#Messaging-Contents").append(messageItem.RI)   
    } else if (Mesing_Type == "SI") {
        $("#Messaging-Contents").append(messageItem.SI)
    }
}

function Load_Messaging_TopField(MesTop_DataId, MesTop_Name, Mes_Top_Avatar, MesTop_Not) {
    $("#Messaging-Top-Field-Name").text(MesTop_Name)
    $("#Messaging-Top-Field-Back-Text").text(MesTop_Not)
    $("#Messaging-Top-Field-MesTop_DataId").text(MesTop_DataId)

    $("#Messaging-Top-Field-Avatar-Type").empty()

    if (Mes_Top_Avatar == "default") {
        $("#Messaging-Top-Field-Avatar-Type").append(`
            <div id="Messaging-Top-Field-Avatar" class="Top-Field-Avatar">
                <svg id="Messaging-Top-Field-Avatar-Img" class="Top-Field-Avatar-Img" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.6vh" height="3vh" viewBox="0 0 26 30">
                    <g fill="var(--Icons-C)" stroke="none" transform="translate(0,30) scale(0.1,-0.1)">
                        <path d="M80 280 c-27 -27 -27 -93 0 -120 30 -30 83 -27 109 6 27 34 27 74 0 108 -26 33 -79 36 -109 6z" />
                        <path d="M32 99 c-19 -13 -32 -28 -30 -38 4 -22 85 -61 128 -61 42 0 118 33 126 54 22 57 -151 91 -224 45z" />
                    </g>
                </svg>
            </div>
        `)
    } else {
        $("#Messaging-Top-Field-Avatar-Type").append(`
            <div id="Messaging-Top-Field-Avatar-Image" class="Messaging-Top-Field-Image">
                <img id="Messaging-Top-Field-Avatar-Image-Img" class="Messaging-Top-Field-Image-Img" src="${Mes_Top_Avatar}">
            </div>
        `)
    }

    if (MesTop_Not == "0") {
        $("#Messaging-Top-Field-Back-Text").css("display", "none")
    } else {
        $("#Messaging-Top-Field-Back-Text").css("display", "flex")
    }
}

$(document).on("click", ".Messaging-Send-Icon, .Messaging-Recive-Icon, #Avatar-Avatar-Image, .Messaging-Top-Field-Image, .Whatsapping-Recive-Img, .Whatsapping-Send-Img, .Whatsapping-Top-Field-Avatar-Image", function() {
    var img = $(this).children().attr('src')

    if (img == undefined) {
        img = $(this).attr('src')
    }

    $("#main__img-link").attr('src', img)
    $(".main__img_container").show()
})

$(document).on("click", "#main__img-button-close", function() {
    copyStuff($("#main__img-link").attr('src'))
})

$(document).on("click", "#main__img-button-copy", function() {
    $(".main__img_container").hide()
})

$(document).on("click", "#Messaging-Top-Field-Right", function() {
    if (!isInContacts) {
        const number = This_Messages_Number

        $("#New-Contact-Name").val("")
        $("#New-Contact-Num").val(number)
        $("#New-Contact-Fav-Switch-State").text("Off")
        $("#New-Contact-Fav-Switch-Img-Inner").attr("fill", "var(--Fav-I-C)")
        New_Contact_Has_Name_And_Num = false
        New_Is_Fav = false
        New_Contact_Name = ""
        New_Contact_Num = ""
        Add_Before_Section = "Messaging"
    
        $("#New-Contact").removeClass().addClass("Show-New-Contact")
    } else {
        New_Notification("Message", "Message", "Kontakt", "Du hast ihn schon als Kontakt")
    }
})

//----------Messaging_Start *Back_End*
$(document).on("click", ".Messages-Content-Box", function() {
    This_Messages_Box = "#" + $(this).attr("id")
    This_Messages_Id = This_Messages_Box.split("-").pop()
    This_Messages_Name = $("#Messages-Content-Box-Name-" + This_Messages_Id).text()
    This_Messages_DataId = $("#Messages-Content-Box-DataId-" + This_Messages_Id).text()
    var All_UnRead_Mes = 0
    Last_Message_Id = 1
    Last_Message_DataId = 6

    isInChat = true

    $(".Messaging-Box").remove()
    $("#Messaging-Space-From-Top").remove()
    $("#Messaging-Contents").append('<div id="Messaging-Space-From-Top"></div>')
    This_Messages_Number = This_Messages_Id

    $.post("https://cc_phone/getChat", JSON.stringify({
        number: This_Messages_Number
    })).done((data) => {
        Load_Messaging_TopField(This_Messages_DataId, This_Messages_Name, data.avatar, All_UnRead_Mes.toString())

        if (data.isInContacts) {
            isInContacts = true
        } else {
            isInContacts = false
        }

        data.messages.forEach((message, index) => {
            index = index
            const date = new Date(message.date * 1000)

            const hours = checkTime(date.getHours())
            const minutes = checkTime(date.getMinutes())

            if (message.coords) {
                if (message.coords[0] && message.coords[1]) {
                    Load_Messaging_Contents(Last_Message_DataId, Last_Message_Id, 'Location: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', message.type, `${hours}:${minutes}`, message.coords[0], message.coords[1])
                    Last_Message_Id++
                    Last_Message_DataId++
                    return
                }
            }

            Load_Messaging_Contents(Last_Message_DataId, Last_Message_Id, message.msg, message.type, `${hours}:${minutes}`)
            Last_Message_Id++
            Last_Message_DataId++
        })

        var element = document.getElementById("Messaging-Contents")
        element.scrollTop = element.scrollHeight
    })

    $("#Messaging").removeClass().addClass("Show-Messaging")

    Messaging_Before_Section = "Messages"
})

$(document).on("click", "#Messaging-Bar-Camera", function() {
    cameraFocus = true
    $("#Camera-Stream").show()
    $.post('https://cc_phone/openCamera', JSON.stringify({}))
    $("#Camera").attr("data-OpenAppMode", "true")
    $("#Camera").removeClass().addClass('Slide-In-Left')
})

$(document).on("click", "#Messaging-Top-Field-Back", (Messaging_Back = function Messaging_Back() {
    if (Messaging_Before_Section == "Messages") {
        Load_Messages()
    }
    
    isInChat = false
    $("#Messaging").removeClass().addClass("Hide-Messaging")
}))

$(document).on("click", "#Messaging-Click-Back", function() {
    $("#Messages").removeClass().addClass("Hide-Messages")
    $("#Messaging").removeClass().addClass("Hide-Messages")

    isInChat = false

    if (Messaging_Before_Section == "Contacts") {
        $("#Contacts").removeClass()
        $(".Contacts-Content-Box-Btn").removeClass("Contacts-Content-Box-Btn-Show").removeClass("Contacts-Content-Box-Btn-Hide")
        $(".Contacts-Content-Box-Name").removeClass("Contacts-Content-Box-Name-Show").removeClass("Contacts-Content-Box-Name-Hide")
        $(".Contacts-Content-Box-Num").removeClass("Contacts-Content-Box-Num-Show").removeClass("Contacts-Content-Box-Num-Hide")
        $(".Contacts-Content-Box").removeClass("Contacts-Content-Box-Activate")
        $(".Contacts-Action-Box").removeClass("Contacts-Action-Box-Show").removeClass("Contacts-Action-Box-Hide")
    } else if (Messaging_Before_Section == "Business") {
        $("#Business").removeClass()
        $(".Business-Content-Box-Btn").removeClass("Business-Content-Box-Btn-Show").removeClass("Business-Content-Box-Btn-Hide")
        $(".Business-Content-Box-Name").removeClass("Business-Content-Box-Name-Show").removeClass("Business-Content-Box-Name-Hide")
        $(".Business-Content-Box-Num").removeClass("Business-Content-Box-Num-Show").removeClass("Business-Content-Box-Num-Hide")
        $(".Business-Content-Box").removeClass("Business-Content-Box-Activate")
        $(".Business-Action-Box").removeClass("Business-Action-Box-Show").removeClass("Business-Action-Box-Hide")
    }

    setTimeout(function() {
        $("#Messaging").removeClass()
    }, 400)
})

$("#Messaging-Bar-Textbox").keypress(function(event) {
    const keycode = event.keyCode ? event.keyCode : event.which
    
    if (keycode == "13") {
        var MessBar_Text = $("#Messaging-Bar-Textbox").val()
        const date = new Date()

        const hours = checkTime(date.getHours())
        const minutes = checkTime(date.getMinutes())

        var MessBar_Time = `${hours}:${minutes}`
        var MessBar_Type = "ST"

        if (!MessBar_Text == "") {
            Load_Messaging_Contents(Last_Message_DataId, Last_Message_Id, MessBar_Text, MessBar_Type, MessBar_Time)
            
            $.post("https://cc_phone/sendMessage", JSON.stringify({
                msg: MessBar_Text,
                number: This_Messages_Number,
                type: "ST",
                coords: false
            }))

            Last_Message_Id++
            Last_Message_DataId++
            $("#Messaging-Bar-Textbox").val("")
            var element = document.getElementById("Messaging-Contents")
            element.scrollTop = element.scrollHeight
        }
    }
})

$(document).on("click", "#Messaging-Bar-Location", function() {
    var location_now = "My_Location_Now"
    const date = new Date()

    const hours = checkTime(date.getHours())
    const minutes = checkTime(date.getMinutes())

    var MessBar_Time = `${hours}:${minutes}`
    var MessBar_Type = "SL"
    $.post('https://cc_phone/getCoords', JSON.stringify({ 
    })).done((data) => {
        Load_Messaging_Contents(Last_Message_DataId, Last_Message_Id, location_now, MessBar_Type, MessBar_Time, data.x, data.y)
    })

    $.post("https://cc_phone/sendMessage", JSON.stringify({
        msg: "Standort",
        number: This_Messages_Number,
        type: MessBar_Type,
        coords: true,
    }))

    Last_Message_Id++
    Last_Message_DataId++
    var element = document.getElementById("Messaging-Contents")
    element.scrollTop = element.scrollHeight
})

$(document).on("click", ".Messaging-Recive-Txt", function() {
    This_Mesing_Loc_Box = "#" + $(this).parent().attr("id")
    This_Mesing_Loc_Box_Id = This_Mesing_Loc_Box.split("-").pop()
    This_Mesing_Loc_Box_Location = $("#Messaging-Recive-Loc-Address-" + This_Mesing_Loc_Box_Id).text()
})

function Load_Business_Contents(Bus_DataId, Bus_Id, Bus_Name, Bus_Num, Bus_Rank, job3) {
    const businessItem = `
        <div id="Business-Content-Box-${Bus_Id}" class="Business-Content-Box">
            <div id="Business-Content-Box-Name-${Bus_Id}" class="Business-Content-Box-Name">${Bus_Name}</div>
            <div id="Business-Content-Box-Num-${Bus_Id}" class="Business-Content-Box-Num">${Bus_Num}</div>
            <div id="Business-Content-Box-DataId-${Bus_Id}" class="Business-Content-Box-DataId">${Bus_DataId}</div>
            <div id="Business-Content-Box-Job3-${Bus_Id}" style="display: none;">${job3}</div>
            <div id="Business-Content-Box-Rank-${Bus_Id}" class="Business-Content-Box-Rank">
                <div id="Business-Content-Box-Rank-Title${Bus_Id}" class="Business-Content-Box-Rank-Title">Rank:</div>
                <div id="Business-Content-Box-Rank-Text${Bus_Id}" class="Business-Content-Box-Rank-Text">${Bus_Rank}</div>
            </div>

            <div id="Business-Content-Action-Box-${Bus_Id}" class="Business-Action-Box">
                <div id="Business-Action-Call-${Bus_Id}" class="Business-Action-Content">
                    <div id="Business-Action-Call-Btn-${Bus_Id}" class="Business-Action-Call"></div>
                    <svg id="Business-Action-Call-Img-${Bus_Id}" class="Business-Action-Img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.000000 44.000000" height="2vh" width="2vh">
                        <g xmlns="http://www.w3.org/2000/svg" transform="translate(0,44) scale(0.1,-0.1)" fill="var(--Icons-A-C)">
                            <path d="M53 445 c-45 -32 -41 -124 9 -202 71 -109 192 -205 276 -219 47 -7 97 9 112 37 20 37 11 56 -45 95 l-55 38 -30 -22 c-16 -12 -33 -22 -39 -22 -14 0 -105 85 -120 113 -12 23 -11 29 9 57 l22 31 -37 55 c-40 58 -63 67 -102 39z" />
                        </g>
                    </svg>

                    <p id="Business-Action-Call-Text-${Bus_Id}" class="Business-Action-Text">Call</p>
                </div>

                <div id="Business-Action-Message-${Bus_Id}" class="Business-Action-Content">
                    <div id="Business-Action-Message-Btn-${Bus_Id}" class="Business-Action-Message"></div>
                    <svg id="Business-Action-Message-Img-${Bus_Id}" class="Business-Action-Img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.000000 44.000000" height="2vh" width="2vh">
                        <g xmlns="http://www.w3.org/2000/svg" transform="translate(0,44) scale(0.1,-0.1)" fill="var(--Icons-A-C)">
                            <path d="M152 418 c-18 -6 -52 -28 -76 -49 -80 -71 -80 -159 0 -236 24 -24 44 -45 44 -49 0 -3 -9 -19 -21 -35 l-20 -29 21 0 c11 0 40 10 63 22 23 12 72 28 109 34 91 16 150 52 177 107 27 55 26 82 -1 137 -34 67 -100 104 -192 107 -39 1 -86 -3 -104 -9z" />
                        </g>
                    </svg>

                    <p id="Business-Action-Message-Text-${Bus_Id}" class="Business-Action-Text">Message</p>
                </div>

                <div id="Business-Action-Settings-${Bus_Id}" class="Business-Action-Content">
                    <div id="Business-Action-Settings-Btn-${Bus_Id}" class="Business-Action-Settings"></div>
                    <svg id="Business-Action-Settings-Img-${Bus_Id}" class="Business-Action-Img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 981 980" width="2vh" height="2vh">
                        <g fill="var(--Icons-A-C)" stroke="none" transform="translate(0,980) scale(0.1,-0.1)">
                            <path d="M3335 9770 c-468 -84 -885 -303 -1003 -527 -46 -87 -50 -136 -19 -258 90 -361 58 -809 -79 -1093 -92 -191 -308 -366 -549 -447 -229 -76 -559 -70 -785 14 -181 67 -285 77 -369 35 -185 -93 -380 -416 -482 -799 -64 -241 -63 -409 3 -548 46 -95 86 -140 156 -173 228 -106 348 -184 494 -323 123 -117 186 -198 244 -316 70 -142 87 -222 88 -405 0 -121 -3 -170 -18 -225 -51 -191 -146 -346 -311 -510 -140 -139 -253 -219 -431 -305 -157 -76 -199 -113 -233 -205 -49 -131 -46 -286 9 -505 52 -208 126 -389 232 -567 87 -145 151 -213 245 -260 67 -33 86 -38 168 -41 77 -4 107 0 181 21 223 64 418 86 601 68 297 -29 454 -103 611 -288 165 -193 245 -437 228 -698 -9 -136 -35 -239 -103 -402 -57 -137 -58 -139 -58 -238 0 -79 4 -107 19 -135 111 -209 420 -406 858 -549 155 -50 259 -72 373 -78 226 -13 370 72 451 268 130 313 401 586 693 695 291 110 636 71 893 -99 202 -135 389 -368 478 -597 8 -19 17 -37 20 -40 3 -3 18 -26 33 -51 38 -67 127 -144 189 -165 143 -47 518 36 813 181 246 121 402 244 456 360 60 127 58 214 -10 381 -73 182 -86 252 -86 469 1 217 15 293 85 443 118 251 300 426 512 490 304 94 537 88 947 -23 150 -40 232 -31 376 43 169 88 335 327 439 634 56 163 76 268 83 418 5 122 3 141 -16 191 -51 134 -150 226 -339 315 -149 70 -244 138 -347 245 -192 203 -285 439 -285 727 0 292 93 524 299 744 129 138 268 235 443 309 120 50 193 112 235 197 26 52 28 66 27 167 -1 136 -34 296 -105 508 -119 358 -290 618 -445 677 -50 18 -73 21 -149 17 -77 -4 -101 -9 -165 -40 -101 -47 -214 -82 -338 -102 -142 -24 -401 -17 -517 14 -278 74 -525 286 -655 564 -47 101 -75 204 -91 339 -21 179 2 342 76 539 58 155 71 223 55 288 -23 99 -172 270 -332 384 -221 157 -615 287 -870 287 -102 0 -155 -27 -240 -119 -63 -69 -78 -94 -147 -241 -50 -108 -110 -190 -210 -291 -155 -155 -311 -245 -521 -301 -109 -29 -357 -36 -469 -14 -206 42 -368 132 -531 296 -120 120 -181 209 -268 391 -81 166 -138 235 -218 263 -62 21 -190 20 -319 -4z m1830 -2591 c485 -56 959 -281 1315 -625 368 -356 602 -813 676 -1319 24 -164 24 -476 0 -640 -45 -307 -150 -599 -311 -865 -395 -652 -1062 -1055 -1820 -1100 -502 -30 -991 102 -1399 378 -146 98 -238 176 -371 313 -330 342 -542 763 -622 1234 -26 157 -26 563 0 720 78 461 282 872 607 1218 159 170 392 341 626 460 401 203 837 279 1299 226z" />
                        </g>
                    </svg>

                    <p id="Business-Action-Settings-Text-${Bus_Id}" class="Business-Action-Text">Settings</p>
                </div>
            </div>
        </div>

        <div id="Business-Space-From-Bottom"></div>
    `

    $("#Business-Space-From-Bottom").remove()
    $("#Business-Contents").append(businessItem)
}

function Load_Business_CaptionField(BusCF_Is_Admin, BusCF_Title, BusCF_Text, BusCF_OnlineTitle, BusCF_OnlineText) {
    $("#Business-Caption-Title").text(BusCF_Title)
    $("#Business-Caption-Text").text(BusCF_Text)
    $("#Business-Player-Count-Title").text(BusCF_OnlineTitle)
    $("#Business-Player-Count-Text").text(BusCF_OnlineText)

    if (BusCF_Is_Admin == false) {
        $("#Business-Caption-Edit-Box").css("display", "none")
        $(".Business-Action-Settings").parent().css("display", "none")
    } else if (BusCF_Is_Admin == true) {
        $("#Business-Caption-Edit-Box").css("display", "block")
        $(".Business-Action-Settings").parent().css("display", "block")
    }
}

$(document).on("click", "#M-App-2", (Load_Business = function Load_Business() {
    currentApp = "Business"

    $("#Business").css('--Col', 'var(--App-Col-2)')
    $("#Business").css('--Row', 'var(--App-Row-1)')

    This_Business_Radio = false

    $.post("https://cc_phone/getBusiness").done((datas) => {
        Load_Business_CaptionField(true, "Message of the Day : ", "" + datas.motd + "", "Members Online :", "" + datas.onlinemembers + "")

        $(".Business-Content-Box").remove()
        
        datas.members.sort(function(a, b) {
            return b.job.grade - a.job.grade
        })

        datas.members.forEach((member, index) => {
            index = index
            Load_Business_Contents(member.number, index, member.name, member.number, member.job.grade, false)
        })

        $("#Business").addClass("Show-App").removeClass("Hide-App")
    })
}))

$(document).on("click", "#Business-Top-Field-Back", function() {
    Business_Back()
})

$(document).on("click", "#Business-Click-Back", (Business_Back = function Business_Back() {
    currentApp = "Home"

    $("#Business").removeClass().addClass("Hide-App")
    $(".Business-Content-Box-Btn").removeClass("Business-Content-Box-Btn-Show").removeClass("Business-Content-Box-Btn-Hide")
    $(".Business-Content-Box-Name").removeClass("Business-Content-Box-Name-Show").removeClass("Business-Content-Box-Name-Hide")
    $(".Business-Content-Box-Num").removeClass("Business-Content-Box-Num-Show").removeClass("Business-Content-Box-Num-Hide")
    $(".Business-Content-Box").removeClass("Business-Content-Box-Activate")

    setTimeout(function() {
        $(".Business-Action-Box").removeClass("Business-Action-Box-Show").removeClass("Business-Action-Box-Hide")
    }, 270)
}))

$(document).on("click", "#Business-Caption-Edit", function() {
    $(".Business-Caption-Edit-Content").removeClass("Business-Caption-Edit-Hide").addClass("Business-Caption-Edit-Show")
})

$(document).on("click", "#Business-Caption-Edit-Apply", (Update_Business_Caption = function Update_Business_Caption() {
    var Caption_New_Text = $("#Business-Caption-Edit-Textbox").val()
    $("#Business-Caption-Text").text(Caption_New_Text)
    $("#Business-Caption-Edit-Textbox").val("")

    $.post("https://cc_phone/setMOTD", JSON.stringify({
        text: Caption_New_Text,
        job3: This_Business_Radio
    }))

    $(".Business-Caption-Edit-Content").removeClass("Business-Caption-Edit-Show").addClass("Business-Caption-Edit-Hide")
}))

$(document).on("click", "#Business-Caption-Edit-Cancel", function() {
    $("#Business-Caption-Edit-Textbox").val("")
    $(".Business-Caption-Edit-Content").removeClass("Business-Caption-Edit-Show").addClass("Business-Caption-Edit-Hide")
})

$(document).on("click", ".Business-Action-Call", function() {
    var This_Business_Call_Box = "#" + $(this).parent().parent().parent().attr("id")
    var This_Business_Call_Id = This_Business_Call_Box.split("-").pop()
    var This_Business_Call_Name_Text = $(This_Business_Call_Box + " #Business-Content-Box-Name-" + This_Business_Call_Id).text()
    var This_Business_Call_Number = $(This_Business_Call_Box + " #Business-Content-Box-DataId-" + This_Business_Call_Id).text()

    $("#Call-Number-Text").text(This_Business_Call_Name_Text)

    Incoming_Call = This_Business_Call_Number

    $.post("https://cc_phone/attemptCall", JSON.stringify({
        number: This_Business_Call_Number
    })).done((data) => {
        if (!data.state) {
            if (data.text != null) {
                New_Notification("Phone", "Phone", "Telefon", data.text)
            }
        } else {
            callFrequenz = data.text
        }
    })

    clearInterval(Call_Timer)

    setTimeout(function() {
        $("#Call-Timer").text("Wird Angerufen")
    }, 400)

    //$("#Business").removeClass("Show-Business").addClass("Call-Hide-Business")

    $("#Call").removeClass().addClass("Call-Show-Phone")
    $("#Call-Back-Transition").css("display", "block")

    Call_Is_Mute = false

    $("#Call-Mute-Off").css("opacity", "0")
    $("#Call-Mute-On").css("opacity", "1")
    $("#Call-Mute-Text").text("Mute")

    Call_Before_Section = "Business"
})

$(document).on("click", ".Business-Action-Message", function() {
    This_Messages_Box = "#" + $(this).attr("id")
    This_Messages_Id = This_Messages_Box.split("-").pop()

    This_Messages_Name = $("#Business-Content-Box-Name-" + This_Messages_Id).text()
    This_Messages_DataId = $("#Business-Content-Box-DataId-" + This_Messages_Id).text()
    var All_UnRead_Mes = 0

    This_Messages_Number = $("#Business-Content-Box-Num-" + This_Messages_Id).text()

    This_Messages_Number = This_Messages_Number
    Last_Message_Id = 1
    Last_Message_DataId = 6

    isInChat = true

    $(".Messaging-Box").remove()
    $("#Messaging-Space-From-Top").remove()
    $("#Messaging-Contents").append('<div id="Messaging-Space-From-Top"></div>')

    $.post("https://cc_phone/getChat", JSON.stringify({
        number: This_Messages_Number
    })).done((data) => {
        Load_Messaging_TopField(This_Messages_DataId, This_Messages_Name, data.avatar, All_UnRead_Mes.toString())

        if (data.isInContacts) {
            isInContacts = true
        } else {
            isInContacts = false
        }

        data.messages.forEach((message, index) => {
            index = index
            const date = new Date(message.date * 1000)

            const hours = checkTime(date.getHours())
            const minutes = checkTime(date.getMinutes())

            if (message.coords) {
                if (message.coords[0] && message.coords[1]) {
                    Load_Messaging_Contents(Last_Message_DataId, Last_Message_Id, 'Location: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', message.type, `${hours}:${minutes}`, message.coords[0], message.coords[1])
                    Last_Message_Id++
                    Last_Message_DataId++
                    return
                }
            }

            Load_Messaging_Contents(Last_Message_DataId, Last_Message_Id, message.msg, message.type, `${hours}:${minutes}`)

            Last_Message_Id++
            Last_Message_DataId++
        })

        var element = document.getElementById("Messaging-Contents")
        element.scrollTop = element.scrollHeight
    })

    //makes the messaging sectio visible
    $("#Messaging").removeClass().addClass("Show-Messaging")
    var element = document.getElementById("Messaging-Contents")
    element.scrollTop = element.scrollHeight

    Messaging_Before_Section = "Business"
})

$(document).on("click", ".Business-Action-Settings", function() {
    const This_Business_Top = Math.trunc($(this).parent().parent().parent().position().top + 215)
    This_Business_Box = "#" + $(this).parent().parent().attr("id")
    This_Business_Box_Id = This_Business_Box.split("-").pop()
    This_Business_Box_DataId = $("#Business-Content-Box-DataId-" + This_Business_Box_Id).text()
    This_Business_Job3 = $("#Business-Content-Box-Job3-" + This_Business_Box_Id).text()
    
    if (This_Business_Job3 == 'true') {
        This_Business_Job3 = true
    } else if (This_Business_Job3 == 'false') {
        This_Business_Job3 = false
    }

    This_Business_Rank = parseInt($("#Business-Content-Box-Rank-Text" + This_Business_Box_Id).text(), 10)
    $("#Business-Settings-Content").css("transition", "none")
    //$("#Business-Settings-Content").css("top", This_Business_Top + "px")
    $("#Business-Settings-Content").css("top", 100 * This_Business_Top / window.innerHeight + "vh")
    
    setTimeout(function() {
        $("#Business-Settings-Content").css("transition", "all 0.3s ease-in-out 0s")
    }, 400)

    $("#Business-Settings-Content").removeClass("Business-Settings-Hide").addClass("Business-Settings-Show")
    $("#Business-Settings-Blur-Back").removeClass("Business-Settings-Blur-Back-Hide").addClass("Business-Settings-Blur-Back-Show")
})

$(document).on("click", "#Business-Settings-RankUp", function() {
    $.post('https://cc_phone/rankUp', JSON.stringify({
        number: This_Business_Box_DataId,
        job3: This_Business_Job3
    })).done((data) => {
        New_Notification("Business", "Business", "Rank Up", data.message, "Jetzt")

        if (data.can) {
            This_Business_Rank++
            $("#Business-Content-Box-Rank-Text" + This_Business_Box_Id).text(This_Business_Rank)
        }

        $("#Business-Settings-Content").removeClass("Business-Settings-Show").addClass("Business-Settings-Hide")
        $("#Business-Settings-Blur-Back").removeClass("Business-Settings-Blur-Back-Show").addClass("Business-Settings-Blur-Back-Hide")
    })
})

$(document).on("click", "#Business-Settings-RankDown", function() {
    $.post('https://cc_phone/rankDown', JSON.stringify({
        number: This_Business_Box_DataId,
        job3: This_Business_Job3
    })).done((data) => {
        New_Notification("Business", "Business", "Rank Down", data.message, "Jetzt")

        if (data.can) {
            This_Business_Rank--
            $("#Business-Content-Box-Rank-Text" + This_Business_Box_Id).text(This_Business_Rank)
        }

        $("#Business-Settings-Content").removeClass("Business-Settings-Show").addClass("Business-Settings-Hide")
        $("#Business-Settings-Blur-Back").removeClass("Business-Settings-Blur-Back-Show").addClass("Business-Settings-Blur-Back-Hide")
    })
})

$(document).on("click", "#Business-Settings-Kick", function() {
    $.post('https://cc_phone/kickPlayer', JSON.stringify({
        number: This_Business_Box_DataId,
        job3: This_Business_Job3
    })).done((data) => {
        New_Notification("Business", "Business", "Kick", data.message, "Jetzt")

        if (data.can) {
            if (This_Business_Job3) {
                Load_Business2()
            } else {
                Load_Business()
            }
        }

        $("#Business-Settings-Content").removeClass("Business-Settings-Show").addClass("Business-Settings-Hide")
        $("#Business-Settings-Blur-Back").removeClass("Business-Settings-Blur-Back-Show").addClass("Business-Settings-Blur-Back-Hide")
    })
})

$(document).on("click", "#Business-Settings-Close", function() {
    $("#Business-Settings-Content").removeClass("Business-Settings-Show").addClass("Business-Settings-Hide")
    $("#Business-Settings-Blur-Back").removeClass("Business-Settings-Blur-Back-Show").addClass("Business-Settings-Blur-Back-Hide")
})

//----------------------------------------------------------------------------------------------------Settings

$(document).on("click", "#D-App-4", function() {
    currentApp = 'Settings'

    $.post("https://cc_phone/getSettings").done((settings) => {
        Load_Settings(settings.phone_number, settings.id, settings.avatar)
    })

    $('#Volume-Range-Slider').val(Volume_Status)
    Volume_Range_Color()

    $("#Settings").addClass("Show-App").removeClass("Hide-App")
})

$(document).on('click', '.Volume-Btn', function() {
    const stop = $(this).attr('data-stop')

    if (stop == "0") {
        IphoneRing.play()
    } else if (stop == "1") {
        IphoneRing.pause()
        IphoneRing.currentTime = 0
    }
})

function Volume_Range_Color() {
    Volume_Status = $("#Volume-Range-Slider").val()
    IphoneRing.volume = Volume_Status / 100
    notificationSound.volume = Volume_Status / 100

    $.post('https://cc_phone/setVolume', JSON.stringify({
        volume: Volume_Status
    }))

    $("#Volume-Range-Slider").css("background", `linear-gradient(to right,var(--color-1),var(--color-1) ${Volume_Status}%,var(--NumBub-C) ${Volume_Status}%)`)
}

function Load_Settings(Set_PNum, Set_PId, Set_Avatar) {
    $("#PhoneNumber-Text").text(Set_PNum)
    $("#Player-Id-Text").text(Set_PId)

    $("#Avatar-Avatar-Type").empty()

    if (Set_Avatar != "default") {
        $("#Avatar-Avatar-Type").append(`
            <div id="Avatar-Avatar-Image" class="Avatar-Image">
                <img id="Avatar-Avatar-Image-Img" class="Avatar-Image-Img" src="${Set_Avatar}">
            </div>
        `)
    } else {
        $("#Avatar-Avatar-Type").append(`
            <div id="Avatar-Box-Avatar" class="Avatar-Box-Avatar">
                <svg id="Avatar-Box-Avatar-Img" class="Avatar-Box-Avatar-Img" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.6vh" height="3vh" viewBox="0 0 26 30">
                    <g fill="var(--Icons-C)" stroke="none" transform="translate(0,30) scale(0.1,-0.1)">
                        <path d="M80 280 c-27 -27 -27 -93 0 -120 30 -30 83 -27 109 6 27 34 27 74 0 108 -26 33 -79 36 -109 6z"/>
                        <path d="M32 99 c-19 -13 -32 -28 -30 -38 4 -22 85 -61 128 -61 42 0 118 33 126 54 22 57 -151 91 -224 45z"/>
                    </g>
                </svg>
            </div>
        `)
    }
}

$(document).on("click", "#Settings-Top-Field-Back", (Settings_Back = function Settings_Back() {
    currentApp = 'Home'
    $("#Settings").removeClass("Show-App").addClass("Hide-App")
}))

$(document).on("click", "#Settings-Click-Back", function() {
    Settings_Back()
})

$(document).on("click", "#Background-Setting-Apply", function() {
    const backgroundText = $("#Background-Setting-Textbox").val().toString()
    const extension = backgroundText.split('.').pop()

    if (backgroundText == "") {
        $(".User-Background").attr('src', "img/Background.png")
                
        $.post('https://cc_phone/setBackground', JSON.stringify({}))

        New_Notification("Settings", "Settings", "Info", "Background wurde aufs Standard gesetzt!", "Jetzt")
        return
    }

    if (backgroundText.includes("<") || backgroundText.includes(">")) {
        New_Notification("Settings", "Settings", "Fehler", "Blacklisted Wort erkannt!", "Jetzt")
    } else {
        if (extension == 'png' || extension == 'gif' || extension == 'jpg' || extension == 'jpeg' && extension != "" && extension != null) {
            $.get(backgroundText).done(function() {
                $(".User-Background").attr('src', backgroundText)
    
                $.post('https://cc_phone/setBackground', JSON.stringify({
                    background: backgroundText
                }))
        
                New_Notification("Settings", "Settings", "Info", "Background wurde gesetzt!", "Jetzt")
            }).fail(function() {
                New_Notification("Settings", "Settings", "Info", "Dieser Link ist ungültig!", "Jetzt")
            })
        } else {
            New_Notification("Settings", "Settings", "Info", "Ungültiges Format", "Jetzt")
        }
    }
})

$(document).on("click", "#Avatar-Apply", function() {
    const type = $(this).attr('data-type')

    if (type == "1") {
        cameraFocus = true
        $("#Camera-Stream").show()
        $.post('https://cc_phone/openCamera', JSON.stringify({}))
        $("#Camera").attr("data-OpenAppMode", "true")
        $("#Camera").removeClass().addClass('Slide-In-Left')
    } else if (type == "2") {
        const avatarText = $("#Avatar-Link-Textbox").val().toString()
        const extension = avatarText.split('.').pop()
    
        if (avatarText == "") {
            $.post('https://cc_phone/setAvatar', JSON.stringify({
                avatar: 'default'
            }))
    
            $("#Avatar-Avatar-Type").empty()
            $("#Avatar-Avatar-Type").append(`
                <div id="Avatar-Box-Avatar" class="Avatar-Box-Avatar">
                    <svg id="Avatar-Box-Avatar-Img" class="Avatar-Box-Avatar-Img" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.6vh" height="3vh" viewBox="0 0 26 30">
                        <g fill="var(--Icons-C)" stroke="none" transform="translate(0,30) scale(0.1,-0.1)">
                            <path d="M80 280 c-27 -27 -27 -93 0 -120 30 -30 83 -27 109 6 27 34 27 74 0 108 -26 33 -79 36 -109 6z"/>
                            <path d="M32 99 c-19 -13 -32 -28 -30 -38 4 -22 85 -61 128 -61 42 0 118 33 126 54 22 57 -151 91 -224 45z"/>
                        </g>
                    </svg>
                </div>
            `)
    
            New_Notification("Settings", "Settings", "Info", "Avatar wurde aufs Standard gesetzt!", "Jetzt")
            return
        } else {
            if (extension == 'png' || extension == 'gif' || extension == 'jpg' || extension == 'jpeg' && extension != "" && extension != null) {
                $.get(avatarText).done(function() {
                    $.post('https://cc_phone/setAvatar', JSON.stringify({
                        avatar: avatarText
                    }))
    
                    $("#Avatar-Avatar-Type").empty()
                    $("#Avatar-Avatar-Type").append(`
                        <div id="Avatar-Avatar-Image" class="Avatar-Image">
                            <img id="Avatar-Avatar-Image-Img" class="Avatar-Image-Img" src="${avatarText}">
                        </div>
                    `)
    
                    New_Notification("Settings", "Settings", "Info", "Avatar wurde gesetzt!", "Jetzt")
                }).fail(function() {
                    New_Notification("Settings", "Settings", "Info", "Dieser Link ist ungültig!", "Jetzt")
                })
            } else {
                New_Notification("Settings", "Settings", "Info", "Ungültiges Format", "Jetzt")
            }
        }
    }
})

$("#FlightMode-Switch").on("change", function() {
    if ($(this).is(":checked")) {
        switchStatus = $(this).is(":checked")

        $.post("https://cc_phone/flightmode", JSON.stringify({
            bool: switchStatus
        })).done((can) => {
            if (can) {
                New_Notification("Settings", "Settings", "Flugmodus", "Flugmodus aktiviert", "Jetzt")
            } else {
                New_Notification("Settings", "Settings", "Flugmodus", "Flugmodus deaktiviert!", "Jetzt")
            }
        })
    } else {
        switchStatus = $(this).is(":checked")

        $.post("https://cc_phone/flightmode", JSON.stringify({
            bool: switchStatus
        })).done((can) => {
            if (can) {
                New_Notification("Settings", "Settings", "Flugmodus", "Flugmodus aktiviert", "Jetzt")
            } else {
                New_Notification("Settings", "Settings", "Flugmodus", "Flugmodus deaktiviert!", "Jetzt")
            }
        })
    }
})

$("#Theme-Setting-Switch").on("change", function() {
    if ($(this).is(':checked')) {
        User_Theme_Mode = "Light"
        setTheme()
    } else {
        User_Theme_Mode = "Dark"
        setTheme()
    }
})

function setTheme() {
    if (User_Theme_Mode == "Dark") {
        Set_Dark_Theme()
        New_Notification("Settings", "Settings", "Theme", "Du hast nun denn Darkmode aktiv", "Jetzt")   
    } else if (User_Theme_Mode == "Light") {
        Set_Light_Theme()
        New_Notification("Settings", "Settings", "Theme", "Du hast nun denn Lightmode aktiv", "Jetzt")   
    }
}

//----------------------------------------------------------------------------------------------------FlappyBird

$(document).on("click", "#M-App-5", function() {
    currentApp = "Flappybird"

    setTimeout(function() {
        $("#FlappyBird").removeClass("Hide-App").addClass("Show-App")
    }, 50)

    $("#FlappyBird").append('<iframe id="FlappyBird-Content" src="Applications/FlappyBird/index.html"></iframe>')
})

$(document).on("click", "#FlappyBird-Click-Back", (FlappyBird_Out = function FlappyBird_Out() {
    currentApp = "Home"

    $("#FlappyBird").removeClass("Show-App").addClass("Hide-App")
    setTimeout(function() {
        $("#FlappyBird-Content").remove()
    }, 300)
}))

//----------------------------------------------------------------------------------------------------Snake

$(document).on("click", "#M-App-11", function() {
    currentApp = "Snake"

    setTimeout(function() {
        $("#Snake").removeClass("Hide-App").addClass("Show-App")
    }, 50)

    $("#Snake").append('<iframe id="Snake-Content" src="Applications/Snake/index.html"></iframe>')
})

$(document).on("click", "#Snake-Click-Back", (Snake_Out = function Snake_Out() {
    currentApp = "Home"

    $("#Snake").removeClass("Show-App").addClass("Hide-App")
    
    setTimeout(function() {
        $("#Snake-Content").remove()
    }, 300)
}))

//----------------------------------------------------------------------------------------------------Garage

$(document).on("click", "#M-App-12", function() {
    currentApp = "Garage"

    $("#Garage-Send-Contents").empty()

    $.post('https://cc_phone/getGarage', JSON.stringify({
    })).done((data) => {
        data.forEach((garage, index) => {
            if (garage.job == 'civ') {
                $("#Garage-Send-Contents").append(`
                <div id="${index}-Box" class="Garage-Send-Contents-Box">
                    <div id="${index}-Title" class="Garage-Send-Contents-Title">${garage.nickname}</div>
                    <div id="${index}-Plate" class="Garage-Send-Contents-Plate">${garage.plate}</div>

                    <div id="Garage-Send-Container" data-type="${garage.type}" data-status="${garage.status}">
                        <svg id="Garage-Send-Loc-Icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="2.4vh" height="4vh" viewBox="0 0 586 978">
                            <g id="Garage-Send-Loc-Img" transform="translate(0,978) scale(0.1,-0.1)">
                                <path d="M2765 9768 c-573 -26 -1154 -239 -1620 -591 -746 -565 -1172 -1453 -1142 -2382 10 -296 72 -627 170 -906 26 -75 557 -1215 1397 -3005 745 -1586 1357 -2883 1360 -2883 5 0 2627 5574 2699 5737 199 451 275 1036 201 1547 -134 922 -699 1720 -1521 2149 -484 253 -982 361 -1544 334z m426 -1791 c364 -95 648 -384 741 -753 32 -128 32 -360 0 -488 -79 -314 -306 -581 -599 -706 -135 -57 -230 -74 -403 -74 -173 0 -268 17 -403 74 -233 100 -442 307 -542 538 -61 140 -79 236 -79 412 0 172 17 269 73 401 113 270 374 505 646 584 179 53 393 57 566 12z"></path>
                            </g>
                        </svg>
                    </div>
                </div>

                <div class="Garage-Send-Content-Box-Line"></div>
            `)
            }
        })
    })

    $("#Garage").removeClass("Hide-App").addClass("Show-App")
})

$(document).on("click", "#Garage-Send-Container", function() {
    const type = $(this).attr('data-type')
    const status = $(this).attr('data-status')

    $.post('https://cc_phone/getGarageWaypoint', JSON.stringify({
        type: type,
        status: status
    })).done(() => {

    })
})

$(document).on("click", "#Garage-Top-Field-Back", function() {
    Garage_Out()
})

$(document).on("click", "#Garage-Click-Back", (Garage_Out = function Garage_Out() {
    $("#Garage").removeClass("Show-App").addClass("Hide-App")
    currentApp = "Home"
}))

//----------Call-PopUp-

function New_Incoming_Call(Incoming_Call_Number, Incoming_Call_Name) {
    IphoneRing.play()

    if (!isPhoneOpen) {
        getNotifyopenPhone()
    }

    Incoming_Call = Incoming_Call_Number
    $("#Call-PopUp-Name").text(Incoming_Call_Name)
    $("#Call-PopUp-Avatar-Text").text(Incoming_Call_Name.charAt(0).toUpperCase())
    $("#Call-PopUp").removeClass().addClass("Show-Call-PopUp")
}

$(document).on("click", "#Call-PopUp-Decline", function() {
    IphoneRing.pause()
    IphoneRing.currentTime = 0

    $.post("https://cc_phone/declineCall", JSON.stringify({
        number: Incoming_Call,
        callFrequenz: callFrequenz
    }))

    $("#Call-PopUp").removeClass().addClass("Hide-Call-PopUp")
})

$(document).on("click", "#Call-PopUp-Answer", function() {
    IphoneRing.pause()
    IphoneRing.currentTime = 0

    $("#Call-Number-Text").text($("#Call-PopUp-Name").text())

    $.post("https://cc_phone/answerCall", JSON.stringify({
        number: Incoming_Call,
        callFrequenz: callFrequenz
    }))

    var counter = 0

    Call_Timer = setInterval(function() {
        ++counter
        $("#Call-Timer").text(secondsToTime(counter))
    }, 1000)

    $("#Call-PopUp").removeClass().addClass("Hide-Call-PopUp")
    $("#Call").removeClass().addClass("Call-Show-Phone")

    Call_Is_Mute = false
    $("#Call-Mute-Off").css("opacity", "0")
    $("#Call-Mute-On").css("opacity", "1")
    $("#Call-Mute-Text").text("Mute")

    Call_Before_Section = "Menu"
})

//----------Notification-PopUp-

function New_Notification(Not_App, Not_Title, Not_Name, Not_Text, Not_Time) {
    notificationSound.play()

    if (!isPhoneOpen) {
        getNotifyopenPhone()
    }

    if (!Is_Notif_On) {
        Is_Notif_On = true
        clearInterval(Notif_Time)
        $("#Notification-PopUp").removeClass().addClass("Show-Notification-PopUp")
        $("#Notification-PopUp-App-Icon").attr("Src", "img/Menu/" + Not_App + ".svg")
        $("#Notification-PopUp-App-Text").text(Not_Title)
        $("#Notification-PopUp-Name").text(Not_Name)
        $("#Notification-PopUp-Text").text(Not_Text)
        $("#Notification-PopUp-Time").text(Not_Time)
        
        Notif_Time = setInterval(function() {
            $("#Notification-PopUp").removeClass().addClass("Hide-Notification-PopUp")
            
            if (!isPhoneOpen) {
                getNotifyclosePhone()
            }

            setTimeout(function() {
                Is_Notif_On = false
                clearInterval(Notif_Time)
            }, 200)
        }, 5000)
    } else if (Is_Notif_On) {
        Is_Notif_On = false

        clearInterval(Notif_Time)

        $("#Notification-PopUp").removeClass().addClass("Hide-Notification-PopUp")

        setTimeout(function() {
            Is_Notif_On = true

            clearInterval(Notif_Time)
            $("#Notification-PopUp").removeClass().addClass("Show-Notification-PopUp")
            $("#Notification-PopUp-App-Icon").attr("Src", "img/Menu/" + Not_App + ".svg")
            $("#Notification-PopUp-App-Text").text(Not_Title)
            $("#Notification-PopUp-Name").text(Not_Name)
            $("#Notification-PopUp-Text").text(Not_Text)
            $("#Notification-PopUp-Time").text(Not_Time)

            Notif_Time = setInterval(function() {
                $("#Notification-PopUp").removeClass().addClass("Hide-Notification-PopUp")

                if (!isPhoneOpen) {
                    getNotifyclosePhone()
                }
                
                setTimeout(function() {
                    Is_Notif_On = false
                    clearInterval(Notif_Time)
                }, 200)
            }, 5000)
        }, 200)
    }
}

$(document).on("click", "#Notification-PopUp", function() {
    $("#Notification-PopUp").removeClass().addClass("Hide-Notification-PopUp")
    Is_Notif_On = false
    clearInterval(Notif_Time)
})

$(document).on("click", "#M-App-3", (Load_Business2 = function Load_Business2() {
    currentApp = "Business"

    $("#Business").css('--Col', 'var(--App-Col-3)')
    $("#Business").css('--Row', 'var(--App-Row-1)')

    This_Business_Radio = true

    $.post("https://cc_phone/getBusiness2").done((datas) => {
        Load_Business_CaptionField(true, "Message of the Day : ", "" + datas.motd + "", "Members Online :", "" + datas.onlinemembers + "")

        $(".Business-Content-Box").remove()

        datas.members.sort(function(a, b) {
            return b.job.grade - a.job.grade
        })

        datas.members.forEach((member, index) => {
            index = index
            Load_Business_Contents(member.number, index, member.name, member.number, member.job.grade, true)
        })

        $("#Business").addClass("Show-App").removeClass("Hide-App")
    })
}))
