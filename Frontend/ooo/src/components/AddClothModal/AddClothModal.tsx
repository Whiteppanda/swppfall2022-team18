import "./AddClothModal.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { selectUserCloth, fetchUserClothes, createUserCloth } from "../../store/slices/userCloth";
import TypeFilter from "../TypeFilter/TypeFilter"

export interface IProps {
    modal_close: (metaType: string) => void
}

const AddClothModal = (props: IProps) => {
	const navigate = useNavigate();

	const [name, setName] = useState<string>("");	// 상의, 하의, 아우터
	const [type, setType] = useState<string>("");
	const [color, setColor] = useState<string>("");
	const [pattern, setPattern] = useState<string>("");
	const [fileImage, setFileImage] = useState("");
	// const [submitted, setSubmitted] = useState<boolean>(false);

	const dispatch = useDispatch<AppDispatch>();

	const METATYPEOPTIONS = [
		{ value: "Type" },
		{ value: "상의" },
		{ value: "하의" },
		{ value: "아우터" },
	];

	// useEffect(() => {
	// 	alert('useffect')
	// 	dispatch(fetchUserClothes());
	// }, [submitted]);

	const clickAddClothHandler = async () => {
		const data = {
			name: name,
			image_link: fileImage,
			type: type,
			color: color,
			pattern: pattern,
		};
		const result = await dispatch(createUserCloth(data));
		props.modal_close(name);
		// setSubmitted(true);
		// window.location.reload();
	};

	const saveFileImage = (e: any) => {
		setFileImage(URL.createObjectURL(e.target.files[0]));
	};

	return (
		<div className="AddClothModal">
			<div className="AddClothModalHead">
				<text id="AddClothModal-text">Add New Cloth</text>
			</div>
			<div className="AddClothModalTop">
				<div className="UploadClothDiv" data-testid="UploadClothDiv">
					<div className="UploadedClothPreviewDiv">
						{fileImage ? (
							fileImage && (
								<img id="uploaded-image-preview" src={fileImage} height="400" />
							)
						) : (
							<div className="UploadedClothTempDiv"></div>
						)}
					</div>
					<input
						type="file"
						id="upload-cloth-button"
						data-testid="upload-cloth-button"
						accept="image/*"
						onChange={saveFileImage}
					/>
				</div>
				<div className="CenterDiv"></div>
				<div className="UploadedClothInfoDiv">
					<div className="UploadedClothInfoDiv-sub">
						<text id="UploadedClothInfoDiv-text">Type</text>
						<br></br>
						<select id="type-select" data-testid="select-component" onChange={(e) => setName(e.target.value)}>
							{METATYPEOPTIONS.map((option, index) => (
								<option key={index} value={option.value} >
									{option.value}
								</option>
							))}
						</select>
					</div>
					<div className="UploadedClothInfoDiv-sub">
						<text id="UploadedClothInfoDiv-text">세부 Type</text>
						<br></br>
						<TypeFilter metaType={name} selectHandler={setType}></TypeFilter>
					</div>
					<div className="UploadedClothInfoDiv-sub">
						<text id="UploadedClothInfoDiv-text">Color</text>
						<br></br>
						<input
							type="text"
							id="cloth-info-input"
							data-testid="cloth-info-input-color"
							value={color}
							onChange={(e) => setColor(e.target.value)}
						/>
					</div>
					<div className="UploadedClothInfoDiv-sub">
						<text id="UploadedClothInfoDiv-text">Pattern</text>
						<br></br>
						<input
							type="text"
							id="cloth-info-input"
							data-testid="cloth-info-input-pattern"
							value={pattern}
							onChange={(e) => setPattern(e.target.value)}
						/>
					</div>
					<button
						id="create-cloth-button"
						data-testid="create-cloth-button"
						onClick={() => clickAddClothHandler()}
					>
						Add to Closet
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddClothModal;