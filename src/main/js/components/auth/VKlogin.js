import React, {useEffect, useRef} from 'react'
import * as VKID from "@vkid/sdk";

export default function VKlogin(){
    const container = useRef();
    function vkidOnSuccess(data) {
        console.log(data)
    }

    function vkidOnError(error) {
        // Обработка ошибки
    }
    useEffect(() => {

        VKID.Config.init({
            app: 54787559,
            redirectUrl: 'https://nw-cards.ru/auth',
            mode: VKID.ConfigAuthMode.InNewTab,
            responseMode: VKID.ConfigResponseMode.Callback,
            scope: 'email phone', // Заполните нужными доступами по необходимости
        });

        const oneTap = new VKID.OneTap();

        oneTap.render({
            container: container.current,
            fastAuthEnabled: false,
            showAlternativeLogin: true
        })
            .on(VKID.WidgetEvents.ERROR, vkidOnError)
            .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload) {
                console.log("SUCCESSSSS!!!")
                console.log(payload)
                const code = payload.code;
                const deviceId = payload.device_id;

                VKID.Auth.exchangeCode(code, deviceId)
                    .then(vkidOnSuccess)
                    .catch(vkidOnError);
            });
    }, [])


    return <div ref={container}></div>;
}