import { TriangleAlert } from "lucide-react";

import { Badge } from "#/components/ui/badge";

export function StalledBadge() {
	return (
		<Badge aria-label="Stalled application" className="gap-1" variant="warning">
			<TriangleAlert className="size-3.5" />
			Stalled
		</Badge>
	);
}
