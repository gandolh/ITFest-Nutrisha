import { Card, Divider, List, ListItem, Text, Title } from "@mantine/core";
import { useAuthContext } from "../auth/AuthContext";

const DAY_NAMES = [
	"sunday",
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
];

const TodayPlan = () => {
	const { curentUser } = useAuthContext();

	const today = DAY_NAMES[new Date().getDay()];
	const dayPlan = curentUser?.mealPlan?.[today];

	const meals: { label: string; value: string | null }[] = [
		{ label: "Breakfast", value: dayPlan?.breakfast?.title ?? null },
		{ label: "Lunch", value: dayPlan?.lunch?.title ?? null },
		{ label: "Dinner", value: dayPlan?.dinner?.title ?? null },
	];

	return (
		<Card shadow="sm" padding="xl">
			<Title order={1}>Today's Plan</Title>
			<Divider my="md" />
			{curentUser === null ? (
				<Text c="dimmed">Log in to see your meal plan.</Text>
			) : (
				<List withPadding>
					{meals.map((meal) => (
						<List.Item key={meal.label} className=" text-3xl">
							{meal.label}
							<List withPadding>
								<ListItem className=" text-xl">
									{meal.value ?? (
										<Text span c="dimmed" inherit>
											Nothing planned
										</Text>
									)}
								</ListItem>
							</List>
						</List.Item>
					))}
				</List>
			)}
		</Card>
	);
};

export default TodayPlan;
