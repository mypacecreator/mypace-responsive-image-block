/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
//import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {MediaUpload, MediaUploadCheck} from '@wordpress/block-editor';
import {Button} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
const Edit = ({
		className,
		attributes: {PCMediaID, PCMediaURL, PCMediaALT, SPMediaID, SPMediaURL},
		setAttributes,
	}) => {
	const newClassName = `${className} mypace-responsive-image`;
	const onSelectPCImage = (PCmedia) => {
		setAttributes({
			PCMediaID: PCmedia.id,
			PCMediaURL: PCmedia.url,
			PCMediaALT: PCmedia.alt,
		});
	};
	const onSelectSPImage = (SPmedia) => {
		setAttributes({
			SPMediaID: SPmedia.id,
			SPMediaURL: SPmedia.url,
		});
	};
	const removePCMedia = () => {
		setAttributes({
			PCMediaID: 0,
			PCMediaURL: '',
			PCMediaALT: '',
		});
	};
	const removeSPMedia = () => {
		setAttributes({
			SPMediaID: 0,
			SPMediaURL: '',
		});
	};
	const getPCImageButton = (open) => {
		if (PCMediaID) {
			return (
				<div className="button-container">
					<div
						onClick={open}
						onKeyPress={open}
						role="button"
						tabIndex="0"
						aria-hidden
					>
						<img src={PCMediaURL} alt={PCMediaALT}/>
					</div>
					<Button
						onClick={removePCMedia}
						isLink
						isDestructive
						className="remove-image"
					>
						PC用画像を削除
					</Button>
				</div>
			);
		}
		return (
			<div className="button-container">
				<Button onClick={open} className="button button-large">
					PC用画像を選択
				</Button>
			</div>
		);
	};
	const getSPImageButton = (open) => {
		if (SPMediaID) {
			return (
				<div className="button-container">
					<div
						onClick={open}
						onKeyPress={open}
						role="button"
						tabIndex="0"
						aria-hidden
					>
						<img src={SPMediaURL} alt=""/>
					</div>
					<Button
						onClick={removeSPMedia}
						isLink
						isDestructive
						className="remove-image"
					>
						SP用画像を削除
					</Button>
				</div>
			);
		}
		return (
			<div className="button-container">
				<Button onClick={open} className="button button-large">
					SP用画像を選択
				</Button>
			</div>
		);
	};

	return (
		<div className={newClassName}>
			<div className="mypace-responsive-image__pc">
				<MediaUploadCheck>
					<MediaUpload
						onSelect={onSelectPCImage}
						allowedTypes="image"
						value={PCMediaID}
						render={({open}) => getPCImageButton(open)}
					/>
				</MediaUploadCheck>
			</div>
			<div className="mypace-responsive-image__sp">
				<MediaUploadCheck>
					<MediaUpload
						onSelect={onSelectSPImage}
						allowedTypes="image"
						value={SPMediaID}
						render={({open}) => getSPImageButton(open)}
					/>
				</MediaUploadCheck>
			</div>
		</div>
	);
};

export default Edit;

