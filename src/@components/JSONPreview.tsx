import React from 'react';
import {Page} from "../@typs/Page.ts";

interface JSONPreviewProps {
    pages: Page[];
}

const JSONPreview: React.FC<JSONPreviewProps> = ({ pages }) => {
    const downloadJSON = () => {
        const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify({ pageList: pages }, null, 2)
        )}`;
        const downloadAnchor = document.createElement('a');
        downloadAnchor.href = dataStr;
        downloadAnchor.download = 'data.json';
        downloadAnchor.click();
    };

    return (
        <div>
            <h3>JSON 미리보기</h3>
            <pre>{JSON.stringify({ pageList: pages }, null, 2)}</pre>
            <button onClick={downloadJSON}>JSON 다운로드</button>
        </div>
    );
};

export default JSONPreview;