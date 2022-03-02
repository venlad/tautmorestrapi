const axios = require("axios");

const STRAPI_URL = "http://localhost:1337";

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaaaeeeeiiiioooouuuunc------";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, ""); // trim - from end of text

  return str;
}

module.exports = {
  async afterCreate(event) {
    const { result, params } = event;

    // do something to the result;

    console.log(result, "EVENT");
    console.log("RUNNED");

    await axios
      .put(`http://localhost:1337/api/chapters/${result.id}`, {
        data: {
          topic: result.topic.map((item) => {
            return {
              topicName: item?.topicName,
              topicDescription: item?.topicDescription,
              slug: string_to_slug(item.topicName),
              subTopic: item.subTopic.map((sub) => {
                return {
                  subTopicName: sub?.subTopicName,
                  subTopicDescription: sub?.subTopicDescription,
                  slug: string_to_slug(sub.subTopicName),
                };
              }),
            };
          }),
        },
      })
      .then((res) => {
        if (res.status === 200) console.log("success");
      })
      .catch((err) => console.log(err.message));

    console.log("BOTTom");
  },
};

// module.exports = {
//   lifecycles: {
//     async afterCreate(entry) {
//       const region = entry.destination_details.region.region;
//       const code = entry.destination_details.country_short_code;
//       const covidAPI = `https://prod.greatescape.co/api/travel/countries/${code.toUpperCase()}/corona`;
//       const fipsCode = entry.destination_details?.fipsCode?.toLowerCase();

//       // get COVID data
//       const covidRes = await axios.get(covidAPI, {
//         headers: {
//           authorization: "Bearer holliday857024651420",
//         },
//       });
//       const covidData = covidRes?.data;

//       const covidOverview = covidData.lockdownInfo.touristInfo;

//       // add COVID data to destination.
//       await axios.put(`${STRAPI_URL}/destinations/${entry.id}`, {
//         covid: {
//           covid_overview: covidOverview,
//         },
//         covid_data: covidTabs,
//         covid_data: {
//           currently_sick: covidData.sick.toString(),
//           vaccinated: covidData.vaccinated.toString(),
//           outbreak_trend: covidData.condition.toString(),
//           last_updated: covidData.lastUpdated.toString(),
//           outbreak_containment: covidData.vaccinated.toString(),
//           vaccinated_rate: covidData.vaccinated.toString(),
//           daily_new_cases: covidData.vaccinated.toString(),
//           tourists_info: covidData.lockdownInfo.touristInfo.toString(),
//           tourists_entry: covidData.lockdownInfo.touristEntry.toString(),
//           shopping: covidData.lockdownInfo.shopping.toString(),
//           bars_and_restaurants:
//             covidData.lockdownInfo.restaurantsAndBars.toString(),
//           tourist_attractions:
//             covidData.lockdownInfo.touristAttractions.toString(),
//           events: covidData.lockdownInfo.events.toString(),
//           events_more_info: covidData.lockdownInfo.eventMoreInfo.toString(),
//           quarantine: covidData.lockdownInfo.quarantine.toString(),
//           quarantine_required:
//             covidData.lockdownInfo.quarantineRequired.toString(),
//           masks: covidData.lockdownInfo.masks[0].toString(),
//           tests: covidData.lockdownInfo.tests.toString(),
//           travel_ban_end_date:
//             covidData?.lockdownInfo?.touristBanEnd?.toString(),
//           deaths: covidData?.dead?.toString(),
//           recovered: covidData?.recovered?.toString(),
//           infected: covidData?.infected?.toString(),
//         },
//       });

//       // get destination key facts
//       const keyFactsRes = await axios.get(
//         `https://raw.githubusercontent.com/factbook/factbook.json/master/${region}/${fipsCode}.json`
//       );
//       const keyFactsData = keyFactsRes?.data;
//       const user = await strapi.query("destination").findOne(entry.id);

//       const subItem = [
//         {
//           sub_heading: "Capital",
//           sub_item_description: keyFactsData?.Government?.Capital["name"]?.text,
//         },
//         {
//           sub_heading: "Long/Lat",
//           sub_item_description:
//             keyFactsData?.Geography["Geographic coordinates"]?.text,
//         },
//         {
//           sub_heading: "Location",
//           sub_item_description: keyFactsData?.Geography?.Location?.text,
//         },
//         {
//           sub_heading: "Government",
//           sub_item_description:
//             keyFactsData.Government["Country name"]["conventional long form"]
//               ?.text,
//         },
//         {
//           sub_heading: "Currency",
//           sub_item_description:
//             keyFactsData.Economy["Exchange rates"]["currency"]?.text,
//         },
//         {
//           sub_heading: "Area",
//           sub_item_description: keyFactsData?.Geography?.Area?.total?.text,
//         },
//         {
//           sub_heading: "Population",
//           sub_item_description:
//             keyFactsData["People and Society"]["Population"]?.text,
//         },
//         {
//           sub_heading: "Languages",
//           sub_item_description:
//             keyFactsData["People and Society"]["Languages"].text ||
//             keyFactsData["People and Society"]["Languages"]["Languages"]?.text,
//         },
//         {
//           sub_heading: "Religion",
//           sub_item_description:
//             keyFactsData["People and Society"]?.Religions?.text,
//         },
//         {
//           sub_heading: "TimeZone",
//           sub_item_description:
//             keyFactsData?.Government?.Capital["time difference"]?.text,
//         },
//         {
//           sub_heading: "Tel Code",
//           sub_item_description:
//             "+" +
//             allCountries?.find((v) => v?.iso2 == code?.toLowerCase())?.dialCode,
//         },
//       ];
//       const countryOverview = keyFactsData?.Introduction?.Background?.text;

//       await axios.put(`${STRAPI_URL}/destinations/${entry.id}`, {
//         key_facts: {
//           sub_item: subItem,
//         },
//         overview: {
//           destination_overview: countryOverview,
//         },
//       });
//     },
//   },
// };
