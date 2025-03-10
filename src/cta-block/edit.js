/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { __experimentalLinkControl as LinkControl, useBlockProps, RichText, MediaPlaceholder, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { ToolbarGroup, PanelBody, SelectControl, ToggleControl, ToolbarButton, Popover } from '@wordpress/components'
import { useState } from '@wordpress/element';
import { link, closeSmall } from '@wordpress/icons';

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
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

export default function Edit({attributes, setAttributes}) {
	
	// setup state for link popover
	const [ showLinkPopover, setShowLinkPopover ] = useState( false );
	const toggleLinkPopover = () => {
			setShowLinkPopover( ( state ) => ! state );
	};

	return (
		<div { ...useBlockProps() } component-animation={attributes.animation_enabled} component-layout-text={attributes.layout_text_variant} component-layout-image={attributes.layout_image_variant} component-theme={attributes.theme_color}>
			{/* link and link controls */}
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ link }
						label="Link"
						onClick={toggleLinkPopover}
						isPressed={showLinkPopover}
					/>
				</ToolbarGroup>
				{showLinkPopover && (
					<Popover>
						<LinkControl
							searchInputPlaceholder="Search here..."
							value={ attributes.link }
							onChange={ ( newLink ) => {
								console.log(newLink)
								setAttributes( { link: {...newLink, title: attributes.link.title || ""} } ) }
							}
						>
						</LinkControl>
					</Popover>
				)}
			</BlockControls>
			{/* End link and link controls */}
			{/* Begin Sidebar Inspector Zone for layout and theme variants */}
			<InspectorControls>
				<PanelBody title="Settings">
				{/* Animation */}
				<ToggleControl
					label="Animation enabled:"
					checked={attributes.animation_enabled}
					onChange={(val) => setAttributes({animation_enabled: val})}
				/>
				{/* Layout text variant */}
					<SelectControl 
						label="Layout Text Variant:"
						onChange={(val) => setAttributes({layout_text_variant: val})}
						value={attributes.layout_text_variant}
						options={
							[
								{
									label: "Text Right",
									value: "text-right"
								},
								{
									label: "Text Left",
									value: "text-left"
								}
							]
						}
					/>
					{/* Layout image variant */}
					<SelectControl 
						label="Layout Image Variant:"
						onChange={(val) => setAttributes({layout_image_variant: val})}
						value={attributes.layout_image_variant}
						options={
							[
								{
									label: "Image Inline",
									value: "image-inline"
								},
								{
									label: "Image Offset",
									value: "image-offset"
								}
							]
						}
					/>
					{/* Layout component theme variant */}
					<SelectControl 
						label="Component Theme:"
						onChange={(val) => setAttributes({theme_color: val})}
						value={attributes.theme_color}
						options={
							[
								{
									label: "One",
									value: "one"
								},
								{
									label: "Two",
									value: "two"
								},
								{
									label: "Three",
									value: "three"
								}
							]
						}
					/>
				</PanelBody>
			</InspectorControls>
			{/* End Sidebar Inspector Zone */}
	
			<div className='cta__image-container'>
				{attributes.image_url && attributes.image_id ? (
						<>
							<img src={attributes.image_url} />
							<ToolbarButton
								className="button-remove"
								icon={ closeSmall }
								label="Remove Image"
								onClick={() => setAttributes({image_url: "", image_id: null})}
							/>
						</>
					) : (
							<MediaPlaceholder
									onSelect = {
										( image ) => {
											setAttributes( { image_url: image.url, image_id: image.id } );
										}
									}
									allowedTypes = { [ 'image' ] }
									multiple = { false }
									labels = { { title: 'CTA Image' } }
								>
							</MediaPlaceholder>
					)	
				}
			</div>
			
			<div className='cta__text-container'>
				<RichText 
					tagName='h2'
					allowedFormats={[]}
					value={attributes.heading}
					onChange={(heading) => setAttributes({heading})}
					placeholder='This is the headline'
				/>
				<RichText 
					tagName='p'
					allowedFormats={[]}
					value={attributes.body}
					onChange={(body) => setAttributes({body})}
					placeholder='This is the body copy'
				/>
				<RichText 
					tagName='a'
					className='cta__button'
					allowedFormats={[]}
					value={attributes.link.title}
					onChange={(newTitle) => setAttributes({link: {...attributes.link, title: newTitle}})}
					placeholder='Button text'
				/>
			</div>
		</div>
	);
}
