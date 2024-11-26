/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './src/index.html'],
    theme: {
        extend: {
            backgroundImage: {
                'chat-background-img': 'url("img/whatsapp-background-img.png")'
                // 'url("https://camo.githubusercontent.com/cba518ead87b032dc6f1cbfc7fade27604449201ac1baf34d889f77f093f01ac/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67")'
            },
            colors: {
                'top-nav-icon': '#54656f',
                'primary-font-color': '#3b4a54',
                'secondary-font-color': '#667781',
                'primary-placeholder-font-color': 'rgb(107, 114, 128)',

                'textfield-height': '35px',

                'primary-background': '#00a884',
                'secondary-background': 'rgb(241, 245, 249)',
                'primary-header-background': 'rgb(240, 242, 245)',

                'primary-border-color': '#e9edef',

                'default-hover-color': 'rgb(245, 246, 246)',

                'default-selected-color': 'rgb(240, 242, 245)'
            }
        },
        fontFamily: {
            display: ['sans serif'],
            body: ['sans serif']
        }
    }
}
