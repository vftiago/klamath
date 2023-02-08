import React from "react";

function Logo({ size = 16 }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			x="0"
			y="0"
			enableBackground="new 0 0 136 192"
			version="1.1"
			viewBox="0 0 136 192"
			xmlSpace="preserve"
			width={size}
			height={size}
		>
			<g>
				<path
					d="M32 0H0v171.4C0 182.8 10.7 192 24 192h8V0z"
					className="st0"
				></path>
			</g>
			<g>
				<g>
					<path d="M128 0H136V24H128z" className="st0"></path>
					<path d="M136 0L128 0 128 24 136 24 136 0z" className="st0"></path>
				</g>
			</g>
			<g>
				<path
					d="M128 0h-8c-13.3 0-24 9.2-24 20.6V192h8c13.3 0 24-9.2 24-20.6V0z"
					className="st0"
				></path>
			</g>
			<g>
				<g>
					<path d="M128 48H136V72H128z" className="st0"></path>
					<path d="M136 48L128 48 128 72 136 72 136 48z" className="st0"></path>
				</g>
			</g>
			<g>
				<g>
					<path d="M32 24H40V48H32z" className="st0"></path>
					<path d="M40 24L32 24 32 48 40 48 40 24z" className="st0"></path>
				</g>
			</g>
		</svg>
	);
}

export default Logo;
