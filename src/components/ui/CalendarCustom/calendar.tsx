import React from "react";
import { CalendarBody } from "@/components/ui/CalendarCustom/calendar-body";
import { CalendarProvider } from "@/components/ui/CalendarCustom/contexts/calendar-context";
import { DndProvider } from "@/components/ui/CalendarCustom/contexts/dnd-context";
import { CalendarHeader } from "@/components/ui/CalendarCustom/header/calendar-header";
import { getEvents, getUsers } from "@/components/ui/CalendarCustom/requests";

async function getCalendarData() {
	return {
		events: await getEvents(),
		users: await getUsers(),
	};
}

export async function Calendar() {
	const { events, users } = await getCalendarData();

	return (
		<CalendarProvider events={events} users={users} view="month">
			<DndProvider showConfirmation={false}>
				<div className="w-full border rounded-xl">
					<CalendarHeader />
					<CalendarBody />
				</div>
			</DndProvider>
		</CalendarProvider>
	);
}
