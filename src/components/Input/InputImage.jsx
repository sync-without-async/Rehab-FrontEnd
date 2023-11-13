import { useMemo, useState } from "react";
import styled from "styled-components";

const UploadBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #dfdfdf;
  border: 1px solid #ababab;
  border-radius: 10px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
`;

const InputImage = ({ ...props }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
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
      return "이미지 등록하기";
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
