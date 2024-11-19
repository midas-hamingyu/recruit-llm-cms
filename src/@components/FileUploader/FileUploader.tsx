import React from 'react';
import styles from './FileUploader.module.scss';
import { UploadedData } from '../../@typs/UploadedData.ts';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

interface FileUploaderProps {
  onUpload: (uploadedData: UploadedData) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json: UploadedData = JSON.parse(reader.result as string);
        onUpload(json);
      } catch (error) {
        alert('JSON 파일을 파싱하는 중 오류가 발생했습니다.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={cx('container')}>
      <h3>JSON 파일 업로드</h3>
      <input
        type="file"
        accept="application/json"
        className={cx('input')}
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default FileUploader;
