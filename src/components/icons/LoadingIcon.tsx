// source: https://loading.io/

import React from "react";

const LoadingIcon = ({ size = 16, duration = 1 }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		style={{ margin: "auto" }}
		width={size}
		height={size}
		display="block"
		preserveAspectRatio="xMidYMid"
		viewBox="0 0 100 100"
	>
		<path fill="#333" d="M0 0H20V20H0z">
			<animate
				attributeName="fill"
				begin="0s"
				calcMode="discrete"
				dur={`${duration}s`}
				keyTimes="0;0.125;1"
				repeatCount="indefinite"
				values="#888888;#333333;#333333"
			></animate>
		</path>
		<path fill="#333" d="M40 0H60V20H40z">
			<animate
				attributeName="fill"
				begin="0.125s"
				calcMode="discrete"
				dur={`${duration}s`}
				keyTimes="0;0.125;1"
				repeatCount="indefinite"
				values="#888888;#333333;#333333"
			></animate>
		</path>
		<path fill="#333" d="M80 0H100V20H80z">
			<animate
				attributeName="fill"
				begin="0.25s"
				calcMode="discrete"
				dur={`${duration}s`}
				keyTimes="0;0.125;1"
				repeatCount="indefinite"
				values="#888888;#333333;#333333"
			></animate>
		</path>
		<path fill="#333" d="M0 40H20V60H0z">
			<animate
				attributeName="fill"
				begin="0.875s"
				calcMode="discrete"
				dur={`${duration}s`}
				keyTimes="0;0.125;1"
				repeatCount="indefinite"
				values="#888888;#333333;#333333"
			></animate>
		</path>
		<path fill="#333" d="M80 40H100V60H80z">
			<animate
				attributeName="fill"
				begin="0.375s"
				calcMode="discrete"
				dur={`${duration}s`}
				keyTimes="0;0.125;1"
				repeatCount="indefinite"
				values="#888888;#333333;#333333"
			></animate>
		</path>
		<path fill="#333" d="M0 80H20V100H0z">
			<animate
				attributeName="fill"
				begin="0.75s"
				calcMode="discrete"
				dur={`${duration}s`}
				keyTimes="0;0.125;1"
				repeatCount="indefinite"
				values="#888888;#333333;#333333"
			></animate>
		</path>
		<path fill="#333" d="M40 80H60V100H40z">
			<animate
				attributeName="fill"
				begin="0.625s"
				calcMode="discrete"
				dur={`${duration}s`}
				keyTimes="0;0.125;1"
				repeatCount="indefinite"
				values="#888888;#333333;#333333"
			></animate>
		</path>
		<path fill="#333" d="M80 80H100V100H80z">
			<animate
				attributeName="fill"
				begin="0.5s"
				calcMode="discrete"
				dur={`${duration}s`}
				keyTimes="0;0.125;1"
				repeatCount="indefinite"
				values="#888888;#333333;#333333"
			></animate>
		</path>
	</svg>
);

export default LoadingIcon;
