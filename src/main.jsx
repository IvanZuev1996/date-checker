import {ConfigProvider} from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './app/App'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    fontSize: 18,
                    fontFamily: '\'Montserrat\', sans-serif'
                },
                components: {
                    Card: {
                        fontSize: 15,
                        headerFontSize: 15
                    },
                    Alert: {
                        fontSize: 15,
                    }
                }
            }}
        >
            <App />
        </ConfigProvider>
    </React.StrictMode>,
)
