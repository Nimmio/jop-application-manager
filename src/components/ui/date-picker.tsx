import type * as React from "react";

import { Input } from "#/components/ui/input";

export function DatePicker({
	className,
	...props
}: React.ComponentProps<typeof Input>) {
	return <Input className={className} type="date" {...props} />;
}
