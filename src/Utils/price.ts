import {PriceItemType} from '@entities/Types/PriceItem';
import * as _ from 'lodash';

export const getRoomPriceHandler = (
	priceList,
	numDays,
	numNight,
	numHours,
	numMoreHours
) => {
	let total = 0;

	const priceHours = _.find(priceList, {type: PriceItemType.HourPrice});

	const priceHMoreHours = _.find(priceList, {
		type: PriceItemType.MoreHoursPrice,
	});

	const priceDays = _.find(priceList, {type: PriceItemType.DayPrice});

	const priceNight = _.find(priceList, {type: PriceItemType.NightPrice});
	if (numDays) {
		total += priceDays.priceRoom * numDays;
	}
	if (numNight) {
		total += priceNight.priceRoom * numNight;
	}
	if (numHours) {
		total += priceHours.priceRoom * numHours;
	}
	if (numMoreHours) {
		total += priceHMoreHours.priceRoom * numMoreHours;
	}
	return total;
};
export function sumTotal(
	numDays,
	numNights,
	numHours,
	numMoreHours,
	rooms,
	services,
	orders
) {
	let total = 0;
	rooms?.map((item) => {
		total += +getRoomPriceHandler(
			item?.room?.roomType?.price?.priceItem,
			numDays,
			numNights,
			numHours,
			numMoreHours
		);
	});

	services?.map(
		(item, index) => (total += +item?.quanlity * +item?.service?.price)
	);
	orders?.map((item, index) => (total += +item?.price));
	return total;
}
