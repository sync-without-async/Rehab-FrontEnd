import { useMemo, useState } from "react";
import styled from "styled-components";

const UploadBox = styled.div`
  width: 154px;
  height: 154px;
  justify-self: center;
  color: #878787;
  background-color: #dfdfdf;
  border: 1px solid #ababab;
  border-radius: 10px;
  font-size: 24px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: pre-wrap;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const InputImage = ({ onImageSelect, ...props }) => {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setSelectedFile(file);
        onImageSelect(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("imageInput").click();
  };

  const content = useMemo(() => {
    if (preview) {
      return <ImagePreview src={preview} alt="Image preview" />;
    } else {
      return "이미지\n등록하기";
    }
  }, [preview]);

  return (
    <UploadBox {...props} onClick={triggerFileInput}>
      {content}
      <HiddenInput type="file" onChange={handleImageChange} id="imageInput" />
    </UploadBox>
  );
};

export default InputImage;
