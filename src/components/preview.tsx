import './preview.css';
import { useEffect, useRef } from "react";
import React from "react";

interface PreviewProps {
    code: string;
    err: string;
}

const html = `
<html>
    <head>
        <style> html {background-color: white;} </style>
    </head>
    <body>
    <div id ="root">
    </div>
        <script>
            const handleError = (err) => {
                const root = document.querySelector('#root');
                root.innerHTML = '<div style="color: red;"><h4>RunTime Error</h4>' + err + '</div>' 
                console.error(err);
            };

            window.addEventListener('error', (event) => {
                event.preventDefault();
                handleError(evenr.error);
            });

            window.addEventListener('message', (event) => {
            try{
                eval(event.data);
            } catch(err) {
                if (err instanceof Error) {
                    return {
                      code: "",
                      err: err.message,
                    };
                  } else {
                    throw err;
                  }
            }
            }, false);
        </script>
    </body>
</html>
`

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
    const iframe = useRef<any>();

    useEffect(() => {
        iframe.current.srcdoc= html;
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*');
        }, 50);
    }, [code]);

    return (
        <div className="preview-wrapper">
            <iframe 
            title = " code preview" 
            ref = {iframe} 
            sandbox= "allow-scripts" 
            srcDoc={html}
        />
       {err && <div className="preview-error">{err}</div>}
        </div>
        
    );
};

export default Preview;