fx_version 'cerulean'
author 'xLeon0666'
game 'gta5'

client_scripts {
    'client/animation.lua',
    'configs/client_config.lua',
    'client/main.lua'
}

shared_scripts {
    'configs/events.lua'
}

server_scripts {
	'@oxmysql/lib/MySQL.lua',
    'configs/server_config.lua',
    'server/classes/phone.lua',
    'server/classes/group.lua',
    'server/main.lua',
}

ui_page 'html/index.html'

files {
    'html/**/'
}