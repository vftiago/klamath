export const colors = {
	text: {
		accent: "#e6503f",
		primary: "#333",
		secondary: "rgba(230, 80, 60, 0.7)",
		muted: "#888",
		error: "#d19999",
	},
	icon: {
		accent: "#e6503f",
		muted: "rgba(128, 128, 128, 0.1)",
	},
	border: {
		muted: "rgba(128, 128, 128, 0.1)",
	},
};

export const sizes = {
	text: {
		xs: "12px",
		s: "14px",
		m: "16px",
	},
};

export const logoSize = 36;

export const iconSize = 16;

export const screenSize = {
	xs: 320,
	sm: 768,
	lg: 1024,
};

export const device = {
	xs: `(min-width: ${screenSize.xs})`,
	sm: `(min-width: ${screenSize.sm})`,
	lg: `(min-width: ${screenSize.lg})`,
};
