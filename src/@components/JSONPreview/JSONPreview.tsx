import React from 'react';
import styles from './JSONPreview.module.scss';
import {Page} from "../../@typs/Page.ts";
import {Company} from "../../@typs/Company.ts";
import {Industry} from "../../@typs/Industry.ts";

interface JSONPreviewProps {
    pages: Page[];
    companies: Company[];
    industries: Industry[];
}

const JSONPreview: React.FC<JSONPreviewProps> = ({
                                                     pages,
                                                     companies,
                                                     industries,
                                                 }) => {
    const downloadJSON = (data: any, fileName: string) => {
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    };

    const combinedData = {
        pages,
        companies,
        industries,
    };

    return (
        <div className={styles.container}>
            <h3>JSON 미리보기</h3>
            <div className={styles.buttonGroup}>
                <button
                    onClick={() => downloadJSON(combinedData, 'data.json')}
                    className={styles.downloadButton}
                >
                    전체 JSON 다운로드
                </button>
                <button
                    onClick={() => downloadJSON(pages, 'pages.json')}
                    className={styles.downloadButton}
                >
                    페이지 JSON 다운로드
                </button>
                <button
                    onClick={() => downloadJSON(companies, 'companies.json')}
                    className={styles.downloadButton}
                >
                    회사 JSON 다운로드
                </button>
                <button
                    onClick={() => downloadJSON(industries, 'industries.json')}
                    className={styles.downloadButton}
                >
                    업종 JSON 다운로드
                </button>
            </div>
            <pre className={styles.jsonPreview}>
        {JSON.stringify(combinedData, null, 2)}
      </pre>

        </div>
    );
};

export default JSONPreview;