import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";

// just some styled components for the image upload area
const getColor = props => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const thumbsContainer = {
  display: "flex",
  marginTop: 16
};

const thumbStyle = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

const errorStyle = {
  color: "#c45e5e",
  fontSize: "0.75rem"
};

// relevant code starts here
const UPLOAD_PICTURE_MUTATION = gql`
  mutation Mutation($file: Upload!, $name: String!, $caption: String) {
    uploadPicture(file: $file, name: $name, caption: $caption) {
      ok
      error
    }
  }
`;

const Upload = ({ register }) => {
  const [preview, setPreview] = useState();
  const [errors, setErrors] = useState();
  const [uploadFile, { data }] = useMutation(UPLOAD_PICTURE_MUTATION);
  const onDrop = useCallback(
    async ([file]) => {
      if (file) {
        setPreview(URL.createObjectURL(file));
        uploadFile({ variables: { file, name: "asdf", caption: "asdfasdf" } });
      } else {
        setErrors("Something went wrong. Check file type and size (max. 1 MB)");
      }
    },
    [uploadFile]
  );
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    maxSize: 1024000
  });

  const thumb = (
    <div style={thumbStyle}>
      <div style={thumbInner}>
        <img src={preview} style={img} />
      </div>
    </div>
  );

  return (
    <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drop file here, or click to select the file</p>
      )}
      {preview && <aside style={thumbsContainer}>{thumb}</aside>}
      {errors && <span style={errorStyle}>{errors}</span>}
      {data && data.uploadFile && (
        <input
          type="hidden"
          name="avatarUrl"
          value={data.uploadFile.Location}
          ref={register}
        />
      )}
    </Container>
  );
};

export default Upload;
// import { gql, useMutation } from "@apollo/client";
// import { ReactNativeFile } from "apollo-upload-client";
// import React, { useCallback } from "react";

// const UPLOAD_PICTURE_MUTATION = gql`
//   mutation Mutation($file: Upload!, $name: String!, $caption: String) {
//     uploadPicture(file: $file, name: $name, caption: $caption) {
//       ok
//       error
//     }
//   }
// `;

// export default () => {
//   const [ImageMutation, { loading, data, error }] = useCallback(
//     useMutation(UPLOAD_PICTURE_MUTATION),
//     []
//   );
//   const handleChange = async e => {
//     const image = e.target.files;
//     console.log(image[0]);
//     const { data } = await ImageMutation({
//       variables: { file: image, name: "asdf", caption: "asdfasdf" }
//     });
//     console.log(data);
//   };

//   return (
//     <div align="center" style={{ marginTop: "10%" }}>
//       <label htmlFor="upload-button">
//         <h5>Upload your photo</h5>
//       </label>
//       <input
//         type="file"
//         id="upload-button"
//         style={{ display: "none" }}
//         required
//         onChange={handleChange}
//       />
//     </div>
//   );
// };
