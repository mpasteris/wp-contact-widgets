( function( blocks, components, i18n, element ) {

	var el = element.createElement;
	var children = blocks.source.children;
	var BlockControls = wp.blocks.BlockControls;
	var AlignmentToolbar = wp.blocks.AlignmentToolbar;
	var InspectorControls = wp.blocks.InspectorControls;
	var TextControl = wp.blocks.InspectorControls.TextControl;
	var TextareaControl = wp.blocks.InspectorControls.TextareaControl;
	var ToggleControl = wp.blocks.InspectorControls.ToggleControl;

	blocks.registerBlockType( 'contact-widgets/contact-block', {
		title: i18n.__( 'Contact Details' ),
		icon: 'email-alt',
		category: 'common',
		attributes: {
			title: {
				type: 'array',
				source: 'children',
				selector: 'h3',
			},
			alignment: {
				type: 'string',
				default: 'center',
			},
			emailAddress: {
				type: 'url',
			},
			phoneNumber: {
				type: 'url',
			},
			faxNumber: {
				type: 'url',
			},
			address: {
				type: 'url',
			},
			displayLabels: {
				type: 'boolean',
				default: false,
			},
			displayMap: {
				type: 'checkbox',
				default: false,
			},
		},

		edit: function( props ) {

			var focus = props.focus;
			var focusedEditable = props.focus ? props.focus.editable || 'title' : null;
			var alignment = props.attributes.alignment;
			var attributes = props.attributes;
			var emailAddress = props.attributes.emailAddress;
			var phoneNumber = props.attributes.phoneNumber;
			var faxNumber = props.attributes.faxNumber;
			var address = props.attributes.address;
			var displayLabels = props.attributes.displayLabels;
			var displayMap = props.attributes.displayMap;

			function onChangeAlignment( newAlignment ) {

				props.setAttributes( { alignment: newAlignment } );

			}

			return [
				!! focus && el(
					blocks.BlockControls,
					{ key: 'controls' },
					el(
						blocks.AlignmentToolbar,
						{
							value: alignment,
							onChange: onChangeAlignment,
						}
					)
				),

				// Block Inspector Options
				!! focus && el(
					blocks.InspectorControls,
					{ key: 'inspector' },
					el( 'div', { className: 'components-block-description' },
						el( 'p', {}, i18n.__( 'Setup your contact details.' ) ),
					),
					el( 'h2', {}, i18n.__( 'Contact Details' ) ),
					el(
						TextControl,
						{
							type: 'email',
							label: i18n.__( 'Email:' ),
							value: emailAddress,
							onChange: function( newEmailAddress ) {
								props.setAttributes( { emailAddress: newEmailAddress } );
							},
						}
					),
					el(
						TextControl,
						{
							type: 'tel',
							label: i18n.__( 'Phone:' ),
							value: phoneNumber,
							onChange: function( newPhoneNumber ) {
								props.setAttributes( { phoneNumber: newPhoneNumber } );
							},
						}
					),
					el(
						TextControl,
						{
							type: 'tel',
							label: i18n.__( 'Fax' ),
							value: faxNumber,
							onChange: function( newFaxNumber ) {
								props.setAttributes( { faxNumber: newFaxNumber } );
							},
						}
					),
					el(
						TextareaControl,
						{
							label: i18n.__( 'Address' ),
							value: address,
							onChange: function( newAddress ) {
								props.setAttributes( { address: newAddress } );
							},
						}
					),
					el(
						ToggleControl,
						{
							type: 'checkbox',
							label: i18n.__( 'Display labels?' ),
							value: displayLabels,
							checked: !! displayLabels,
							onChange: function( newDisplayLabels ) {
								props.setAttributes( { displayLabels: newDisplayLabels } );
							},
						}
					),
					el(
						ToggleControl,
						{
							type: 'checkbox',
							label: i18n.__( 'Display map of address?' ),
							value: displayMap,
							checked: !! displayMap,
							onChange: function( newDisplayMap ) {
								props.setAttributes( { displayMap: newDisplayMap } );
							},
						}
					),
				),

				// Block
				el( 'div', { className: props.className },
					el( 'div', {
						className: 'contact-widgets-content', style: { textAlign: alignment } },
						el( blocks.Editable, {
							tagName: 'h3',
							inline: false,
							placeholder: i18n.__( 'Contact Details Title' ),
							value: attributes.title,
							onChange: function( newTitle ) {
								props.setAttributes( { title: newTitle } );
							},
							focus: focusedEditable === 'title' ? focus : null,
							onFocus: function( focus ) {
								props.setFocus( _.extend( {}, focus, { editable: 'title' } ) );
							},
						} ),
						el( 'div', { className: 'contact-widgets-contact' },
							attributes.emailAddress && el( 'li', {
									className: attributes.displayLabels ? 'has-label' : '',
								},
								( attributes.displayLabels && attributes.displayLabels ) && el( 'strong', {}, i18n.__( 'Email' ) ),
								( attributes.displayLabels && attributes.displayLabels ) && el( 'br', {}, null ),
								el( 'div', {}, el( 'a', {
											href: 'mailto:' + attributes.emailAddress,
										},
										attributes.emailAddress
									),
								)
							),
							attributes.phoneNumber && el( 'li', {
									className: attributes.displayLabels ? 'has-label' : '',
								},
								( attributes.displayLabels && attributes.phoneNumber ) && el( 'strong', {}, i18n.__( 'Phone' ) ),
								( attributes.displayLabels && attributes.phoneNumber ) && el( 'br', {}, null ),
								el( 'div', {}, attributes.phoneNumber )
							),
							attributes.faxNumber && el( 'li', {
									className: attributes.displayLabels ? 'has-label' : '',
								},
								( attributes.displayLabels && attributes.faxNumber ) && el( 'strong', {}, i18n.__( 'Fax' ) ),
								( attributes.displayLabels && attributes.faxNumber ) && el( 'br', {}, null ),
								el( 'div', {}, attributes.faxNumber )
							),
							attributes.address && el( 'li', {
									className: attributes.displayLabels ? 'has-label' : '',
								},
								( attributes.displayLabels && attributes.address ) && el( 'strong', {}, i18n.__( 'Address' ) ),
								( attributes.displayLabels && attributes.address ) && el( 'br', {}, null ),
								el( 'div', {}, attributes.address )
							),
							( attributes.displayMap && attributes.address ) &&
							el( 'iframe', {
									src: 'https://www.google.com/maps?q=' + encodeURIComponent( attributes.address ) + '&output=embed&hl=%s&z=14',
									frameborder: 0,
									className: 'wpcw-widget-contact-map',
								},
							),
						),
					),
				)
			];
		},

		save: function( props ) {

			var attributes = props.attributes;
			var alignment = props.attributes.alignment;

			return (
				el( 'div', { className: props.className },
					el( 'div', { className: 'contact-widgets-content', style: { textAlign: attributes.alignment } },
						el( 'h3', {}, attributes.title ),
						el( 'div', { className: 'contact-widgets-contact' },
							attributes.emailAddress && el( 'li', {
									className: attributes.displayLabels ? 'has-label' : '',
								},
								( attributes.displayLabels && attributes.displayLabels ) && el( 'strong', {}, i18n.__( 'Email' ) ),
								( attributes.displayLabels && attributes.displayLabels ) && el( 'br', {}, null ),
								el( 'div', {}, el( 'a', {
											href: 'mailto:' + attributes.emailAddress,
										},
										attributes.emailAddress
									),
								)
							),
							attributes.phoneNumber &&
							el( 'li', {
									className: attributes.displayLabels ? 'has-label' : '',
								},
								( attributes.displayLabels && attributes.phoneNumber ) && el( 'strong', {}, i18n.__( 'Phone' ) ),
								( attributes.displayLabels && attributes.phoneNumber ) && el( 'br', {}, null ),
								el( 'div', {}, attributes.phoneNumber )
							),
							attributes.faxNumber && el( 'li', {
									className: attributes.displayLabels ? 'has-label' : '',
								},
								( attributes.displayLabels && attributes.faxNumber ) && el( 'strong', {}, i18n.__( 'Fax' ) ),
								( attributes.displayLabels && attributes.faxNumber ) && el( 'br', {}, null ),
								el( 'div', {}, attributes.faxNumber )
							),
							attributes.address && el( 'li', {
									className: attributes.displayLabels ? 'has-label' : '',
								},
								( attributes.displayLabels && attributes.address ) && el( 'strong', {}, i18n.__( 'Address' ) ),
								( attributes.displayLabels && attributes.address ) && el( 'br', {}, null ),
								el( 'div', {}, attributes.address )
							),
							( attributes.displayMap && attributes.address ) &&
							el( 'iframe', {
									src: 'https://www.google.com/maps?q=' + encodeURIComponent( attributes.address ) + '&output=embed&hl=%s&z=14',
									frameborder: 0,
									className: 'wpcw-widget-contact-map',
								},
							),
						)
					)
				)
			);
		},
	} );

} )(
	window.wp.blocks,
	window.wp.components,
	window.wp.i18n,
	window.wp.element,
);
