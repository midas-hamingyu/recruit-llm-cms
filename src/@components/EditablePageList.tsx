import React, {useEffect, useState} from 'react';
import {Page} from "../@typs/Page.ts";

interface EditablePageListProps {
    pages: Page[];
    onUpdatePage: (updatedPages: Page[]) => void;
}

const EditablePageList: React.FC<EditablePageListProps> = ({
                                                               pages,
                                                               onUpdatePage,
                                                           }) => {
    const [editPages, setEditPages] = useState<Page[]>(pages);

    // 부모로부터 받은 pages 상태가 변경되면 editPages도 동기화
    useEffect(() => {
        setEditPages(pages);
    }, [pages]);

    // 입력값 변경 핸들러
    const handleInputChange = (
        index: number,
        field: keyof Page,
        value: string | number
    ) => {
        const updatedPages = [...editPages];
        updatedPages[index] = { ...updatedPages[index], [field]: value };
        setEditPages(updatedPages);
        onUpdatePage(updatedPages);
    };

    // 삭제 핸들러
    const handleDelete = (index: number) => {
        const updatedPages = [...editPages];
        updatedPages.splice(index, 1);
        setEditPages(updatedPages);
        onUpdatePage(updatedPages);
    };

    return (
        <div>
            <h3>페이지 리스트 (수정 가능)</h3>
            {editPages.map((page, index) => (
                <div
                    key={page.pageSn}
                    style={{
                        marginBottom: '1rem',
                        border: '1px solid #ccc',
                        padding: '1rem',
                    }}
                >
                    <label>
                        페이지 이름:
                        <input
                            type="text"
                            value={page.name}
                            onChange={(e) =>
                                handleInputChange(index, 'name', e.target.value)
                            }
                        />
                    </label>
                    <label>
                        기업명:
                        <input
                            type="text"
                            value={page.companyName}
                            onChange={(e) =>
                                handleInputChange(index, 'companyName', e.target.value)
                            }
                        />
                    </label>
                    <label>
                        JSON URL:
                        <input
                            type="text"
                            value={page.pageJsonUrl}
                            onChange={(e) =>
                                handleInputChange(index, 'pageJsonUrl', e.target.value)
                            }
                        />
                    </label>
                    <button onClick={() => handleDelete(index)}>삭제</button>
                </div>
            ))}
        </div>
    );
};

export default EditablePageList;