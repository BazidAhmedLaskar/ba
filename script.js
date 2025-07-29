// Global variables
let currentUser = null;
let currentAuthMode = 'login'; // 'login' or 'signup'
let currentOrder = {
    service: '',
    serviceRate: 0,
    quantity: 0,
    link: '',
    total: 0
};

const SERVICE_CATEGORIES = {
    twitter: {
        name: 'Twitter Services',
        services: {
            twitter_followers: {
                id: 14732,
                name: 'Twitter Followers [ X ] | 100k/D | Non Refil | Super instant',
                rate: 101.85,
                min: 10,
                max: 500000,
                average_time: 'Not Enough Data'
            },
            twitter_retweet: {
                id: 14733,
                name: 'Twitter Retweet [ X ] | 100k/D | Max 100k | Super instant',
                rate: 48.874,
                min: 50,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            twitter_tweet_video_views: {
                id: 15873,
                name: 'Twitter [ X ] | Tweet video Views | Speed 50/80 M Per Day | Instant',
                rate: 0.488,
                min: 100,
                max: 999999999,
                average_time: 'Not Enough Data'
            },
            twitter_likes_instant: {
                id: 15874,
                name: 'Twitter Likes [ X ] | 100k/D | Super Fast | instant',
                rate: 80.176,
                min: 10,
                max: 50000,
                average_time: '52 minutes 14 seconds'
            },
            twitter_likes_refill_30d: {
                id: 15875,
                name: 'Twitter Likes [ X ] | 100k/D | Super Fast | Refill 30 Days | instant ♻️⚡',
                rate: 91.011,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            twitter_likes_refill_lifetime: {
                id: 15876,
                name: 'Twitter Likes [ X ] | 100k/D | Super Fast | Refill - Lifetime | instant ♻️⚡',
                rate: 101.845,
                min: 10,
                max: 500000,
                average_time: 'Not Enough Data'
            },
            twitter_likes_favori: {
                id: 14734,
                name: 'Twitter likes - Favori [ X ] | 100k/D | Max 100k | Super instant',
                rate: 48.874,
                min: 50,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            twitter_bookmarks: {
                id: 14735,
                name: 'Twitter Bookmars [ X ] | 100k/D | Non Refil | Super instant',
                rate: 61.741,
                min: 1,
                max: 50000,
                average_time: 'Not Enough Data'
            }
        }
    },
    instagram: {
        name: 'Instagram Services',
        services: {
            instagram_followers_stable_s2_15posts_30k_day: {
                id: 15837,
                name: 'Instagram Followers | Old Accounts With 15 Posts | 30k Per Day ] - ⚡🔥',
                rate: 57.571,
                min: 10,
                max: 1000000,
                average_time: '9 minutes 16 seconds'
            },
            instagram_followers_stable_s2_15posts_30k_day_30d_refill: {
                id: 15838,
                name: 'Instagram Followers | Old Accounts With 15 Posts | 30k Per Day | 30 Days Refill',
                rate: 62.901,
                min: 10,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            instagram_followers_stable_s2_15posts_30k_day_365d_refill: {
                id: 15839,
                name: 'Instagram Followers | Old Accounts With 15 Posts | 30k Per Day | 365 Days Refill',
                rate: 66.1,
                min: 10,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            instagram_followers_stable_s2_15posts_30k_day_lifetime_refill: {
                id: 15840,
                name: 'Instagram Followers | Old Accounts With 15 Posts | 30k Per Day | Lifetime Refill',
                rate: 70.365,
                min: 10,
                max: 1000000,
                average_time: '1 hour 10 minutes'
            },
            instagram_zero_drop_followers_auto_refill_24h: {
                id: 15697,
                name: 'Instagram Zero Drop followers | Auto Refill Every 24 Hours |',
                rate: 109.411,
                min: 20,
                max: 500000000,
                average_time: '23 minutes 17 seconds'
            },
            instagram_for_100k_above_profiles: {
                id: 15735,
                name: 'For 100K Or Above Profiles',
                rate: 100000.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            },
            instagram_followers_nondrop_lifetime_ultrafast: {
                id: 15833,
                name: 'Instagram Followers | Non Drop | Lifetime Refill | Ultra Fast | One Click Done I',
                rate: 75.336,
                min: 10,
                max: 5000000,
                average_time: '16 minutes 15 seconds'
            },
            instagram_followers_nondrop_365d_500k_day: {
                id: 15726,
                name: 'Instagram Followers | Non Drop | 365 Days Refill | 500K Per Day',
                rate: 84.895,
                min: 10,
                max: 10000000,
                average_time: '17 minutes 36 seconds'
            },
            instagram_followers_lowdrop_30d_100k_day: {
                id: 15727,
                name: 'Instagram Followers | Low Drop | 30 Days Refill | 100K Per Day',
                rate: 62.18,
                min: 50,
                max: 1000000,
                average_time: '27 minutes 50 seconds'
            },
            instagram_followers_lowdrop_365d_100k_day: {
                id: 15728,
                name: 'Instagram Followers | Low Drop | 365 Days Refill | 100K Per Day',
                rate: 74.66,
                min: 10,
                max: 500000,
                average_time: '1 hour 17 minutes'
            },
            instagram_followers_always_nondrop_lifetime_ultrafast_1m_day: {
                id: 15592,
                name: 'Instagram Followers |Always Non Drop | Lifetime Refill | Ultra Fast | One Click Done | 1M Per Day',
                rate: 96.00,
                min: 10,
                max: 10000000,
                average_time: '26 minutes 45 seconds'
            },
            instagram_likes_old_account_50k_hour_lifetime_refill: {
                id: 15877,
                name: 'Instagram Likes | Old Account With Profile Post | 50K Per Hour | Lifetime Refill | One Click Done',
                rate: 1.356,
                min: 10,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            instagram_likes_old_account_500k_hour_lifetime_refill: {
                id: 15732,
                name: 'Instagram Likes | Old Account With Profile Post | 500k Per Hour | Lifetime Refill | One Click Done',
                rate: 1.872,
                min: 10,
                max: 10000000,
                average_time: '19 minutes 33 seconds'
            },
            instagram_likes_old_account_50k_day_no_refill: {
                id: 15351,
                name: 'Instagram Likes | Old Account With Profile Post | 50K Per Day | No Refill',
                rate: 0.96,
                min: 20,
                max: 100000,
                average_time: '14 minutes 25 seconds'
            },
            instagram_likes_old_account_200k_day_365d_refill: {
                id: 15731,
                name: 'Instagram Likes | Old Account With Profile Post | 200K Per Day | 365 Days Refill',
                rate: 1.02,
                min: 100,
                max: 1000000,
                average_time: '27 minutes 41 seconds'
            },
            instagram_reels_views_no_stuck_200_400k_hour: {
                id: 15729,
                name: 'Instagram Reels Views | No Stuck | 200-400k Per Hour|',
                rate: 0.128,
                min: 100,
                max: 4085000000,
                average_time: '2 minutes 52 seconds'
            },
            instagram_views_if_another_service_stuck: {
                id: 15835,
                name: 'Instagram Views if Another Service Stuck',
                rate: 0.103,
                min: 1000,
                max: 18000000,
                average_time: 'Not Enough Data'
            },
            instagram_reels_views_300k_hour_no_stuck: {
                id: 15789,
                name: 'Instagram Reels Views | 300K Per Hour | No Stuck',
                rate: 0.144,
                min: 100,
                max: 4085000000,
                average_time: '56 seconds'
            },
            instagram_reels_views_200k_day_good_working: {
                id: 15724,
                name: 'Instagram Reels Views | 200K Per Day | Good Working',
                rate: 0.084,
                min: 200,
                max: 1000000,
                average_time: '1 minute 29 seconds'
            },
            instagram_reels_views_500k_hour_ultrafast: {
                id: 15681,
                name: 'Instagram Reels Views | 500K Per Hour | Ultra Fast | One Click Done',
                rate: 0.168,
                min: 100,
                max: 1000000,
                average_time: '6 minutes 53 seconds'
            },
            instagram_views_on_photo_or_carousel: {
                id: 15564,
                name: 'Instagram Views On Photo Or Carouse',
                rate: 1.14,
                min: 10,
                max: 10000000,
                average_time: '4 minutes 9 seconds'
            },
            instagram_indian_custom_comment_0_6_hours: {
                id: 15492,
                name: 'Instagram Indian Custom Comment | Start 0 - 6 Hours',
                rate: 78.00,
                min: 20,
                max: 10000,
                average_time: '1 hour 19 minutes'
            },
            instagram_custom_comments_100_indian_real_accounts: {
                id: 15640,
                name: 'Instagram Custom Comments | 100% Indian Real Accounts | 300-500 Per Day',
                rate: 547.2,
                min: 5,
                max: 500,
                average_time: '3 days 19 hours'
            },
            instagram_custom_comments_5k_day_instant_start: {
                id: 15733,
                name: 'Instagram Custom Comments | 5K Per Day | Instant Start',
                rate: 476.543,
                min: 10,
                max: 10000,
                average_time: '30 days 3 hours'
            },
            instagram_random_comments_5k_day_instant_start: {
                id: 15734,
                name: 'Instagram Random Comments | 5K Per Day |Instant Start',
                rate: 376.714,
                min: 10,
                max: 5000,
                average_time: '1 day 21 hours'
            },
            instagram_real_indian_quantity_likes_super_fast: {
                id: 15574,
                name: 'Instagram Real Indian Quantity Likes | Super Fast | One Click Done',
                rate: 16.8,
                min: 10,
                max: 10000000,
                average_time: '45 minutes 20 seconds'
            },
            instagram_indian_mix_likes_over_delivery_100k_hour: {
                id: 15462,
                name: 'Instagram Indian Mix Likes | Over Delivery | 100K Per Hour |',
                rate: 10.2,
                min: 100,
                max: 500000,
                average_time: '2 hours 12 minutes'
            },
            instagram_indian_mix_likes_slow_20k_day_30d_refill: {
                id: 14640,
                name: 'Instagram Indian Mix Likes | Slow | 20K Per Day | 30 Days Refill|',
                rate: 4.914,
                min: 100,
                max: 5000000,
                average_time: '22 minutes 4 seconds'
            },
            instagram_active_profile_indian_likes_100_active_20k_day: {
                id: 15544,
                name: 'Instagram Active Profile Indian Likes | 100% Active Indian | 20K Per Day',
                rate: 24.036,
                min: 10,
                max: 30000,
                average_time: '1 day 21 hours'
            },
            instagram_active_profile_indian_likes_100_active_50k_day: {
                id: 15525,
                name: 'Instagram Active Profile Indian Likes | 100% Active Indian | 50K Per Day',
                rate: 26.79,
                min: 10,
                max: 200000,
                average_time: '17 hours 54 minutes'
            },
            instagram_active_profile_indian_likes_100_active_50k_day_instant: {
                id: 15526,
                name: 'Instagram Active Profile Indian Likes | 100% Active Indian | 50K Per Day | Instant Start',
                rate: 26.183,
                min: 10,
                max: 30000,
                average_time: '9 hours 6 minutes'
            },
            instagram_active_profile_indian_likes_100_active_30k_day_1: {
                id: 15528,
                name: 'Instagram Active Profile Indian Likes | 100% Active Indian | 30K Per Day',
                rate: 32.49,
                min: 20,
                max: 30000,
                average_time: '2 hours 13 minutes'
            },
            instagram_active_profile_indian_likes_100_active_20k_day_2: {
                id: 15527,
                name: 'Instagram Active Profile Indian Likes | 100% Active Indian | 20K Per Day',
                rate: 39.9,
                min: 10,
                max: 30000,
                average_time: '6 hours 58 minutes'
            },
            instagram_active_profile_indian_likes_100_active_30k_day_2: {
                id: 15529,
                name: 'Instagram Active Profile Indian Likes | 100% Active Indian | 30K Per Day',
                rate: 57.182,
                min: 20,
                max: 10000,
                average_time: '10 hours 18 minutes'
            },
            instagram_100_pure_active_indian_followers_lowdrop_200k_day_365d_refill: {
                id: 15702,
                name: 'Instagram 100% Pure Active Indian Followers | Low Drop | 200K Per Day | 365 Days Refill | One Click Done',
                rate: 90.811,
                min: 50,
                max: 50000000,
                average_time: '1 hour 19 minutes'
            },
            instagram_90_pure_active_indian_followers_lowdrop_2k_day_lifetime_refill: {
                id: 15471,
                name: 'IInstagram 90% Pure Active Indian Followers | Low Drop | 2K Per Day l Lifetime Refill | 1 Hour Start Time',
                rate: 118.8,
                min: 100,
                max: 10000,
                average_time: '10 hours 27 minutes'
            },
            instagram_indian_followers_influencers_quality_slow_1k_day: {
                id: 14808,
                name: 'Instagram Indian Followers | Influencers Quality | Slow | 1K Per Day',
                rate: 433.2,
                min: 10,
                max: 3000,
                average_time: '12 hours 58 minutes'
            },
            instagram_100_pure_indian_followers_lowdrop_20k_day_lifetime_refill: {
                id: 14857,
                name: 'Instagram 100% Pure Indian Followers | Low Drop | 20K Per Day | Lifetime Refill | One Click Done',
                rate: 252.00,
                min: 10,
                max: 3000000,
                average_time: '2 hours 22 minutes'
            },
            instagram_100_pure_indian_followers_lowdrop_3k_day_lifetime_refill: {
                id: 14858,
                name: 'Instagram 100% Pure Indian Followers | Low Drop | 3K Per Day | Lifetime Refill',
                rate: 243.796,
                min: 10,
                max: 10000,
                average_time: '1 hour 43 minutes'
            },
            instagram_indian_mixed_followers_lowdrop_200k_day_365d_refill: {
                id: 15637,
                name: 'Instagram Indian Mixed Followers | Low Drop | 200K Per Day | 365 Days Refill | One Click Done',
                rate: 144.00,
                min: 50,
                max: 200000,
                average_time: '16 minutes 3 seconds'
            },
            instagram_100_pure_indian_followers_lowdrop_200k_day_no_refill: {
                id: 15708,
                name: 'Instagram 100% Pure Indian Followers | Low Drop | 200K Per Day | No Refill | One Click Done',
                rate: 81.6,
                min: 10,
                max: 1000000,
                average_time: '1 hour 21 minutes'
            },
            instagram_100_pure_indian_followers_lowdrop_200k_day_30d_refill: {
                id: 15709,
                name: 'Instagram 100% Pure Indian Followers | Low Drop | 200K Per Day | 30 Days Refill | One Click Done',
                rate: 82.8,
                min: 10,
                max: 1000000,
                average_time: '45 minutes 2 seconds'
            },
            instagram_story_poll_votes_instant_first_vote: {
                id: 14486,
                name: 'Instagram Story Poll Votes | Instant | First Vote | Working',
                rate: 103.2,
                min: 100,
                max: 500000,
                average_time: '17 minutes 44 seconds'
            },
            instagram_story_poll_votes_instant_second_vote: {
                id: 14489,
                name: 'Instagram Story Poll Votes | Instant | Second Vote | Working',
                rate: 103.591,
                min: 100,
                max: 500000,
                average_time: '1 hour 41 minutes'
            },
            instagram_story_poll_votes_instant_third_vote: {
                id: 14487,
                name: 'Instagram Story Poll Votes | Instant | Third Vote | Working',
                rate: 68.736,
                min: 100,
                max: 500000,
                average_time: 'Not Enough Data'
            },
            instagram_story_poll_votes_instant_fourth_vote: {
                id: 14488,
                name: 'Instagram Story Poll Votes | Instant | Fourth Vote | Working',
                rate: 68.736,
                min: 100,
                max: 500000,
                average_time: 'Not Enough Data'
            },
            instagram_story_poll_votes_working: {
                id: 12744,
                name: 'Instagram Story Poll Votes | Working',
                rate: 136.562,
                min: 10,
                max: 100000,
                average_time: '4 hours'
            },
            instagram_share_instant_working_stable: {
                id: 15397,
                name: 'Instagram Share | Instant | Working | Stable',
                rate: 0.645,
                min: 100,
                max: 999999999,
                average_time: '7 minutes 15 seconds'
            },
            instagram_share_instant_working_stable_365d_refill: {
                id: 14954,
                name: 'Instagram Share | Instant | Working | Stable 365 Days Refill',
                rate: 2.381,
                min: 100,
                max: 1000000,
                average_time: '13 minutes 32 seconds'
            },
            instagram_share_engagement_instant_working_stable: {
                id: 15398,
                name: 'Instagram Share + Enagement | Instant | Working | Stable',
                rate: 5.38,
                min: 10,
                max: 999999999,
                average_time: '18 minutes 8 seconds'
            },
            instagram_post_reels_save_instant_indian_download: {
                id: 14681,
                name: 'Instagram Post\\Reels Save | Instant | Indian Download | 50K Per Day',
                rate: 0.403,
                min: 250,
                max: 5000,
                average_time: '3 hours 58 minutes'
            },
            instagram_share_instant_working_stable_2: {
                id: 15588,
                name: 'Instagram Share | Instant | Working | Stable',
                rate: 1.092,
                min: 100,
                max: 10000000,
                average_time: '11 minutes 6 seconds'
            },
            instagram_share_instant_working_stable_3: {
                id: 15648,
                name: 'Instagram Share | Instant | Working | Stable',
                rate: 0.855,
                min: 100,
                max: 2147483647,
                average_time: '10 minutes 7 seconds'
            },
            instagram_channel_member_real_active_ultrafast_global: {
                id: 15368,
                name: 'Instagram Channel Member | Real And Active | Ultra Fast | Global',
                rate: 53.4,
                min: 10,
                max: 1000000,
                average_time: '43 minutes 45 seconds'
            },
            instagram_channel_member_real_active_ultrafast_usa: {
                id: 15369,
                name: 'Instagram Channel Member | Real And Active | Ultra Fast | USA',
                rate: 52.954,
                min: 10,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            instagram_channel_member_real_active_ultrafast_arab: {
                id: 15370,
                name: 'Instagram Channel Member | Real And Active | Ultra Fast | Arab',
                rate: 53.4,
                min: 10,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            instagram_channel_member_real_active_ultrafast_turkey: {
                id: 15371,
                name: 'Instagram Channel Member | Real And Active | Ultra Fast | Turkey',
                rate: 52.954,
                min: 10,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            instagram_channel_member_real_active_ultrafast_azerbaijan: {
                id: 15372,
                name: 'Instagram Channel Member | Real And Active | Ultra Fast | Azerbaijan',
                rate: 52.954,
                min: 10,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            instagram_channel_member_real_active_ultrafast_latin_america: {
                id: 15373,
                name: 'Instagram Channel Member | Real And Active | Ultra Fast | Latin America',
                rate: 52.954,
                min: 10,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            instagram_channel_member_real_active_ultrafast_indian: {
                id: 15374,
                name: 'Instagram Channel Member | Real And Active | Ultra Fast | Indian',
                rate: 54.154,
                min: 10,
                max: 1000000,
                average_time: '35 minutes 12 seconds'
            },
            instagram_channel_member_real_active_ultrafast_brazil: {
                id: 15375,
                name: 'Instagram Channel Member | Real And Active | Ultra Fast | Brazil',
                rate: 52.954,
                min: 10,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            instagram_channel_member_real_active_ultrafast_vietnam: {
                id: 15376,
                name: 'Instagram Channel Member | Real And Active | Ultra Fast | Vietnam',
                rate: 61.354,
                min: 10,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            instagram_channel_member_real_active_ultrafast_thailand: {
                id: 15377,
                name: 'Instagram Channel Member | Real And Active | Ultra Fast | Thailand',
                rate: 54.154,
                min: 10,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            instagram_channel_member_real_active_ultrafast_nigeria: {
                id: 15378,
                name: 'Instagram Channel Member | Real And Active | Ultra Fast | Nigeria',
                rate: 52.954,
                min: 10,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            instagram_channel_member_real_active_ultrafast_pakistan: {
                id: 15379,
                name: 'Instagram Channel Member | Real And Active | Ultra Fast | Pakistan',
                rate: 52.954,
                min: 10,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            instagram_story_impression_instant: {
                id: 12238,
                name: 'Instagram Story Impression | Instant',
                rate: 26.74,
                min: 200,
                max: 1000000,
                average_time: '8 minutes 51 seconds'
            },
            instagram_story_views_profile_visits: {
                id: 12240,
                name: 'Instagram Story Views + Profile Visits',
                rate: 13.745,
                min: 50,
                max: 10000,
                average_time: '11 minutes 52 seconds'
            },
            instagram_story_views_impressions_10k_day: {
                id: 12241,
                name: 'Instagram Story Views + Impressions | 10K/D | 0-1/H Start Time',
                rate: 15.86,
                min: 100,
                max: 10000,
                average_time: '11 minutes 56 seconds'
            },
            instagram_story_views_female_majority: {
                id: 14678,
                name: 'Instagram Story Views | Female Majority | One Click Done',
                rate: 7.8,
                min: 20,
                max: 250000,
                average_time: '1 hour 16 minutes'
            },
            instagram_story_views_majority_indian_200k_day: {
                id: 14679,
                name: 'Instagram Story Views | Majority Indian | 200K Per Day',
                rate: 7.787,
                min: 100,
                max: 200000,
                average_time: '15 minutes 48 seconds'
            },
            instagram_story_views_working: {
                id: 15722,
                name: 'Instagram Story Views | Working',
                rate: 3.754,
                min: 50,
                max: 50000,
                average_time: '5 minutes 30 seconds'
            },
            instagram_reach_impression_non_drop_instant: {
                id: 15331,
                name: 'Instagram Reach + Impression | Non Drop | Instant',
                rate: 3.00,
                min: 100,
                max: 300000,
                average_time: '9 minutes 53 seconds'
            },
            instagram_reach_non_drop_instant: {
                id: 15330,
                name: 'Instagram Reach | Non Drop | Instant',
                rate: 2.04,
                min: 100,
                max: 10000000,
                average_time: '7 minutes 56 seconds'
            },
            instagram_reach_impression_non_drop_instant_2: {
                id: 14235,
                name: 'Instagram Reach + Impression | Non Drop | Instant',
                rate: 4.41,
                min: 50,
                max: 10000,
                average_time: '27 minutes 20 seconds'
            },
            instagram_live_stream_views_15_minutes: {
                id: 14561,
                name: 'Instagram Live Stream Views | 15 Minutas | Instant Start',
                rate: 102.096,
                min: 10,
                max: 400,
                average_time: '50 minutes 22 seconds'
            },
            instagram_live_stream_views_60_minutes: {
                id: 14562,
                name: 'Instagram Live Stream Views | 60 Minutas | Instant Start',
                rate: 243.412,
                min: 50,
                max: 20000,
                average_time: 'Not Enough Data'
            },
            instagram_live_stream_views_30_minutes: {
                id: 14563,
                name: 'Instagram Live Stream Views | 30 Minutas | Instant Start',
                rate: 121.706,
                min: 50,
                max: 20000,
                average_time: 'Not Enough Data'
            }
        }
    },
    snapchat: {
        name: 'Snapchat Services',
        services: {
            snapchat_followers_30d_refill: {
                id: 15500,
                name: 'Snapchat Followers [ Start - Instant ] [ Speed 700-1k/Day ] Refill 30 Days ♻️🔥',
                rate: 1275.38,
                min: 1,
                max: 12000,
                average_time: 'Not Enough Data'
            },
            snapchat_followers_lifetime_refill: {
                id: 15501,
                name: 'Snapchat Followers [ Start - Instant ] [ Speed 800-1k/Day ] Refill - Lifetime ♻️🔥',
                rate: 1382.107,
                min: 1,
                max: 15000,
                average_time: 'Not Enough Data'
            }
        }
    },
    whatsapp: {
        name: 'WhatsApp Services',
        services: {
            whatsapp_channel_members_global: {
                id: 15704,
                name: '𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐌𝐞𝐦𝐛𝐞𝐫𝐬 𝐆𝐨𝐨𝐝 𝐐𝐮𝐚𝐥𝐢𝐭𝐲 [ 𝐆𝐥𝐨𝐛𝐚𝐥 🌎 ] [ 𝐌𝐚𝐱 100𝐊 ] | 10𝐤/20𝐤 𝐝𝐚𝐲 | 𝐍𝐨-𝐑𝐞𝐟𝐢𝐥𝐥 ⚠️',
                rate: 166.224,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            whatsapp_channel_members_indian: {
                id: 15705,
                name: '𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐌𝐞𝐦𝐛𝐞𝐫𝐬 𝐆𝐨𝐨𝐝 𝐐𝐮𝐚𝐥𝐢𝐭𝐲 [ 100% 𝐈𝐧𝐝𝐢𝐚𝐧 🇮🇳 ] [ 𝐌𝐚𝐱 100𝐊 ] | 10𝐤/20𝐤 𝐝𝐚𝐲 | 𝐍𝐨-𝐑𝐞𝐟𝐢𝐥𝐥 ⚠️',
                rate: 167.424,
                min: 10,
                max: 100000,
                average_time: '37 minutes 14 seconds'
            },
            whatsapp_channel_members_arab: {
                id: 15706,
                name: '𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐌𝐞𝐦𝐛𝐞𝐫𝐬 𝐆𝐨𝐨𝐝 𝐐𝐮𝐚𝐥𝐢𝐭𝐲 [ 𝐀𝐫𝐚𝐛 🇦🇪 ] [ 𝐌𝐚𝐱 100𝐊 ] | 10𝐤/20𝐤 𝐝𝐚𝐲 | 𝐍𝐨-𝐑𝐞𝐟𝐢𝐥𝐥 ⚠️',
                rate: 167.424,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            whatsapp_channel_members_europe: {
                id: 15707,
                name: '𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐌𝐞𝐦𝐛𝐞𝐫𝐬 𝐆𝐨𝐨𝐝 𝐐𝐮𝐚𝐥𝐢𝐭𝐲 [ 𝐄𝐮𝐫𝐨𝐩𝐞 🇪🇺 ] [ 𝐌𝐚𝐱 100𝐊 ] | 10𝐤/20𝐤 𝐝𝐚𝐲 | 𝐍𝐨-𝐑𝐞𝐟𝐢𝐥𝐥 ⚠️',
                rate: 167.424,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            }
        }
    },
    premium_apps: {
        name: 'Premium Apps & Subscriptions',
        services: {
            all_apps_premium_available_bundle: {
                id: 14901,
                name: 'Netflix, Amazon Prime , Youtube & Music , spotify , Sony Live , Disney + hotstar , jio cinema ,',
                rate: 50.00,
                min: 1,
                max: 1,
                average_time: '1 minute'
            },
            unlimited_random_call_apk: {
                id: 14902,
                name: 'Unlimited random call apk',
                rate: 50.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            },
            any_type_of_apk_premium_order: {
                id: 14903,
                name: 'If you want any type of apk premium order this',
                rate: 50.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            },
            telegram_premium_mod_available: {
                id: 14950,
                name: 'Telegram premium Mod available',
                rate: 50.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            },
            netflix_1_month_subscription: {
                id: 15523,
                name: 'Netflix 1 month subscription',
                rate: 100.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            },
            netflix_2_months_subscription_4k_uhd: {
                id: 15041,
                name: 'Netflix 2 Months Subscription 4k UHD',
                rate: 159.00,
                min: 1,
                max: 1,
                average_time: '1 minute'
            },
            netflix_3_months_subscription_4k_uhd: {
                id: 15040,
                name: 'Netflix 3 Months Subscription 4k UHD',
                rate: 239.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            },
            netflix_6_months_subscription_4k_uhd: {
                id: 15042,
                name: 'Netflix 6 Months Subscription 4k UHD',
                rate: 499.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            },
            amazon_3_months_subscription: {
                id: 15524,
                name: 'Amazon 3 months subscription',
                rate: 140.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            },
            amazon_prime_6_months_subscription_4k_uhd: {
                id: 15043,
                name: 'Amazon Prime 6 month’s Subscription 4k UHD',
                rate: 199.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            },
            disney_hotstar_3_month_subscription: {
                id: 15044,
                name: 'Disney + Hotstar 3 month subscription',
                rate: 99.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            },
            spotify_3_month_premium: {
                id: 15045,
                name: 'Spotify 3 month premium',
                rate: 99.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            },
            sony_liv_3_month_subscription: {
                id: 15046,
                name: 'Sony Liv 3 Month Subscription',
                rate: 149.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            },
            zee_5_three_months_premium: {
                id: 15047,
                name: 'Zee 5 Three Months Premium',
                rate: 149.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            },
            jio_savan_1_year_plan: {
                id: 15048,
                name: 'Jio Savan 1 Year plan',
                rate: 149.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            },
            crunchy_roll_1_year_subscription: {
                id: 15049,
                name: 'Crunchy Roll 1 year subscription',
                rate: 239.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            },
            any_other_subscriptions: {
                id: 15050,
                name: 'If You Want Any Other Subscriptions',
                rate: 10000.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            }
        }
    },
    telegram: {
        name: 'Telegram Services',
        services: {
            telegram_100_active_online_member_lifetime_refill_100k_day: {
                id: 15468,
                name: 'Telegram 100% Active And Online Member | Only In This Service | Non Drop | LIfetime Refill | 100K Per Day',
                rate: 88.579,
                min: 500,
                max: 100000,
                average_time: '41 minutes 45 seconds'
            },
            telegram_100_indian_member_ultrafast_100k_day_90d_refill: {
                id: 15467,
                name: 'Telegram 100 % Indian Member | Ultra Fast | 100K Per Day | 90 Days Refill',
                rate: 78.315,
                min: 10,
                max: 200000,
                average_time: '2 hours 3 minutes'
            },
            telegram_100_indian_member_nondrop_100k_day_90d_refill: {
                id: 15469,
                name: 'Telegram 100 % Indian Member | Non Drop | 100K Per Day | 90 Days Refill',
                rate: 91.2,
                min: 500,
                max: 1000000,
                average_time: '5 hours 49 minutes'
            },
            telegram_member_100k_day_lifetime_refill_fresh: {
                id: 15855,
                name: 'Telegram Member | 100K Per Day | Lifetime Refill On Fresh | 0-1 Hour Start Time',
                rate: 19.212,
                min: 50,
                max: 5000000,
                average_time: 'Not Enough Data'
            },
            telegram_members_60_days_refill_instant_almost: {
                id: 15594,
                name: 'Telegram Members | 60 Days Refill | Instant Almost',
                rate: 2.7,
                min: 10,
                max: 100000,
                average_time: '2 hours 13 minutes'
            },
            telegram_group_channel_member_200k_day_no_refill: {
                id: 15456,
                name: 'Telegram Group \\ Channel Member | 200K Per Day | No Refill',
                rate: 8.28,
                min: 10,
                max: 100000,
                average_time: '23 minutes 34 seconds'
            },
            telegram_members_10k_day_no_refill: {
                id: 15863,
                name: 'Telegram Members | 10K Per Day | No Refill | 0-1 Hour Start Time',
                rate: 0.664,
                min: 100,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            telegram_members_40k_day_30d_refill: {
                id: 15864,
                name: 'Telegram Members | 40k Per Day | 30 Days Refill | 0-1 Hour Start Time',
                rate: 1.422,
                min: 100,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            telegram_6k_members_package: {
                id: 14661,
                name: 'Telegram 6k members package',
                rate: 450.00,
                min: 1,
                max: 1,
                average_time: '1 minute'
            },
            telegram_10k_members_package: {
                id: 14659,
                name: 'Telegram 10k Members package',
                rate: 700.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            },
            telegram_20k_members: {
                id: 14660,
                name: 'Telegram 20k members',
                rate: 1350.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            },
            telegram_50k_members: {
                id: 14662,
                name: 'Telegram 50k members',
                rate: 3500.00,
                min: 1,
                max: 1,
                average_time: 'Not Enough Data'
            },
            telegram_member_nondrop_100k_day_30d_refill: {
                id: 15843,
                name: 'Telegram Member | Non Drop | 100K Per Day | 30 Days Refill | 5 Minutes Start Time',
                rate: 62.627,
                min: 10,
                max: 50000,
                average_time: 'Not Enough Data'
            },
            telegram_member_nondrop_100k_day_60d_refill: {
                id: 15844,
                name: 'Telegram Member | Non Drop | 100K Per Day | 60 Days Refill | 5 Minutes Start Time',
                rate: 69.336,
                min: 10,
                max: 50000,
                average_time: 'Not Enough Data'
            },
            telegram_member_nondrop_100k_day_90d_refill: {
                id: 15845,
                name: 'Telegram Member | Non Drop | 100K Per Day | 90 Days Refill | 5 Minutes Start Time',
                rate: 78.446,
                min: 10,
                max: 50000,
                average_time: 'Not Enough Data'
            },
            telegram_member_nondrop_100k_day_365d_refill: {
                id: 15846,
                name: 'Telegram Member | Non Drop | 100K Per Day | 365 Days Refill | 5 Minutes Start Time',
                rate: 81.556,
                min: 10,
                max: 50000,
                average_time: 'Not Enough Data'
            },
            telegram_member_nondrop_100k_day_lifetime_refill: {
                id: 15847,
                name: 'Telegram Member | Non Drop | 100K Per Day | Lifetime Refill | 5 Minutes Start Time',
                rate: 87.065,
                min: 10,
                max: 50000,
                average_time: 'Not Enough Data'
            },
            telegram_member_50k_day_10_drop_possible_lifetime_refill: {
                id: 15390,
                name: 'Telegram Member | 50K Per Day | 10% Drop Possible | Lifetime Refill | Instant Start',
                rate: 56.667,
                min: 500,
                max: 500000,
                average_time: '23 minutes 26 seconds'
            },
            tg_future_post_view_1_post: {
                id: 15609,
                name: 'TG Future Post View | 1 Post | Max Unlimited',
                rate: 0.216,
                min: 10,
                max: 2147482764,
                average_time: 'Not Enough Data'
            },
            tg_future_post_view_5_post: {
                id: 15610,
                name: 'TG Future Post View | 5 Post | Max Unlimited',
                rate: 1.968,
                min: 10,
                max: 2147482764,
                average_time: 'Not Enough Data'
            },
            tg_future_post_view_10_post: {
                id: 15611,
                name: 'TG Future Post View | 10 Post | Max Unlimited',
                rate: 3.936,
                min: 10,
                max: 2147482764,
                average_time: 'Not Enough Data'
            },
            tg_future_post_view_20_post: {
                id: 15612,
                name: 'TG Future Post View | 20 Post | Max Unlimited',
                rate: 7.944,
                min: 10,
                max: 2147482764,
                average_time: 'Not Enough Data'
            },
            tg_future_post_view_30_post: {
                id: 15613,
                name: 'TG Future Post View | 30 Post | Max Unlimited',
                rate: 11.64,
                min: 10,
                max: 2147482764,
                average_time: 'Not Enough Data'
            },
            tg_future_post_view_40_post: {
                id: 15614,
                name: 'TG Future Post View | 40 Post | Max Unlimited',
                rate: 15.6,
                min: 10,
                max: 2147482764,
                average_time: 'Not Enough Data'
            },
            tg_future_post_view_50_post: {
                id: 15615,
                name: 'TG Future Post View | 50 Post | Max Unlimited',
                rate: 20.4,
                min: 10,
                max: 2147482764,
                average_time: 'Not Enough Data'
            },
            tg_future_post_view_100_post: {
                id: 15616,
                name: 'TG Future Post View | 100 Post | Max Unlimited',
                rate: 40.284,
                min: 10,
                max: 2147482764,
                average_time: 'Not Enough Data'
            },
            tg_future_post_view_200_post: {
                id: 15617,
                name: 'TG Future Post View | 200 Post | Max Unlimited',
                rate: 79.367,
                min: 10,
                max: 2147482764,
                average_time: 'Not Enough Data'
            },
            tg_future_post_view_500_post: {
                id: 15618,
                name: 'TG Future Post View | 500 Post | Max Unlimited',
                rate: 189.932,
                min: 10,
                max: 2147482764,
                average_time: 'Not Enough Data'
            },
            tg_future_post_view_1000_post: {
                id: 15619,
                name: 'TG Future Post View | 1000 Post | Max Unlimited',
                rate: 402.835,
                min: 10,
                max: 2147482764,
                average_time: 'Not Enough Data'
            },
            telegram_views_last_10_post: {
                id: 15557,
                name: 'Telegram Views [ Last 10 Post ] ⚡',
                rate: 2.561,
                min: 10,
                max: 500000,
                average_time: '1 hour 20 minutes'
            },
            telegram_views_last_15_post: {
                id: 15558,
                name: 'Telegram Views [ Last 15 Post ] ⚡',
                rate: 3.842,
                min: 10,
                max: 500000,
                average_time: '1 day 17 hours'
            },
            telegram_views_last_20_post: {
                id: 15559,
                name: 'Telegram Views [ Last 20 Post ] ⚡',
                rate: 5.123,
                min: 10,
                max: 500000,
                average_time: 'Not Enough Data'
            },
            telegram_views_last_30_post: {
                id: 15560,
                name: 'Telegram Views [ Last 30 Post ] ⚡',
                rate: 7.791,
                min: 10,
                max: 500000,
                average_time: 'Not Enough Data'
            },
            telegram_views_last_50_post: {
                id: 15561,
                name: 'Telegram Views [ Last 50 Post ] ⚡',
                rate: 12.807,
                min: 10,
                max: 500000,
                average_time: 'Not Enough Data'
            },
            telegram_views_last_100_post: {
                id: 15562,
                name: 'Telegram Views [ Last 100 Post ] ⚡',
                rate: 25.613,
                min: 10,
                max: 500000,
                average_time: '24 minutes 40 seconds'
            },
            telegram_views_last_200_post: {
                id: 15563,
                name: 'Telegram Views [ Last 200 Post ] ⚡',
                rate: 51.227,
                min: 10,
                max: 500000,
                average_time: '1 hour 50 minutes'
            },
            telegram_premium_bot_start_7_days: {
                id: 15744,
                name: 'Telegram Premium Bot Start + Add Note + Activity for 7 Days | 7 Days Premium | Instant',
                rate: 207.493,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            telegram_premium_bot_start_15_days: {
                id: 15745,
                name: 'Telegram Premium Bot Start + Add Note + Activity for15 Days | 15Days Premium | Instant',
                rate: 290.491,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            telegram_premium_bot_start_30_days: {
                id: 15746,
                name: 'Telegram Premium Bot Start + Add Note + Activity for 30Days | 30Days Premium | Instant',
                rate: 357.926,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            telegram_premium_members_views_7_days: {
                id: 15736,
                name: 'Telegram Premium Members + Views | 7 Days Premium | Instant',
                rate: 243.805,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            telegram_premium_members_views_14_days: {
                id: 15737,
                name: 'Telegram Premium Members + Views | 14 Days Premium | Instant',
                rate: 446.111,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            telegram_premium_members_views_20_30_days: {
                id: 15738,
                name: 'Telegram Premium Members + Views | 20 - 30 Days Premium | Instant',
                rate: 518.734,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            telegram_premium_members_views_30_60_days: {
                id: 15739,
                name: 'Telegram Premium Members + Views | 30 - 60 Days Premium | Instant',
                rate: 1037.467,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            telegram_premium_members_views_45_days: {
                id: 15740,
                name: 'Telegram Premium Members + Views | 45 Days Premium | Instant',
                rate: 1193.087,
                min: 10,
                max: 30000,
                average_time: 'Not Enough Data'
            },
            telegram_premium_members_views_60_days: {
                id: 15741,
                name: 'Telegram Premium Members + Views | 60 Days Premium | Instant',
                rate: 1597.7,
                min: 10,
                max: 30000,
                average_time: 'Not Enough Data'
            },
            telegram_premium_members_views_90_days: {
                id: 15742,
                name: 'Telegram Premium Members + Views | 90 Days Premium | Instant',
                rate: 2023.061,
                min: 10,
                max: 30000,
                average_time: 'Not Enough Data'
            },
            telegram_premium_members_views_180_days: {
                id: 15743,
                name: 'Telegram Premium Members + Views | 180 Days Premium | Instant',
                rate: 3475.515,
                min: 10,
                max: 30000,
                average_time: 'Not Enough Data'
            },
            telegram_vote_instant: {
                id: 15556,
                name: 'Telegram vote | Instant',
                rate: 10.459,
                min: 10,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            telegram_vote_poll_instant_1: {
                id: 11255,
                name: 'Telegram vote \\ Poll | Instant',
                rate: 26.069,
                min: 5,
                max: 5000,
                average_time: '2 hours 53 minutes'
            },
            telegram_vote_poll_instant_2: {
                id: 11256,
                name: 'Telegram vote \\ Poll | Instant',
                rate: 28.805,
                min: 10,
                max: 300000,
                average_time: '8 hours 32 minutes'
            },
            telegram_vote_poll_instant_3: {
                id: 11257,
                name: 'Telegram vote \\ Poll | Instant',
                rate: 29.325,
                min: 10,
                max: 100000,
                average_time: '1 hour 32 minutes'
            }
        }
    },
    youtube: {
        name: 'YouTube Services',
        services: {
            youtube_subscribes_updated_nondrop_10_20k_day_lifetime_refill: {
                id: 15826,
                name: 'Youtube Subscribes | Updated | Non Drop | 10/20K Per Day | Lifetime Refill | 1 Hour Start',
                rate: 780.00,
                min: 100,
                max: 500000,
                average_time: 'Not Enough Data'
            },
            youtube_subscribes_nondrop_40_80_per_day_lifetime_refill: {
                id: 15486,
                name: 'Youtube Subscribes | Non Drop | 40\\80 Per Day | Lifetime Refill | 1 Hour Start Time',
                rate: 120.00,
                min: 50,
                max: 100000,
                average_time: '33 days 8 hours'
            },
            youtube_subscribes_nondrop_100_200_per_day_lifetime_refill: {
                id: 15487,
                name: 'Youtube Subscribes | Non Drop | 100\\200 Per Day | Lifetime Refill | 1 Hour Start Time',
                rate: 126.00,
                min: 50,
                max: 300000,
                average_time: '19 days 6 hours'
            },
            youtube_subscribes_nondrop_250_300_per_day_lifetime_refill: {
                id: 15488,
                name: 'Youtube Subscribes | Non Drop | 250\\300 Per Day | Lifetime Refill | 1 Hour Start Time',
                rate: 174.00,
                min: 100,
                max: 2000000,
                average_time: '6 days 12 hours'
            },
            youtube_subscribes_nondrop_4k_per_day_lifetime_refill: {
                id: 15490,
                name: 'Youtube Subscribes | Non Drop | 4k Per Day | Lifetime Refill | 1 Hour Start Time',
                rate: 264.00,
                min: 100,
                max: 1000000,
                average_time: '6 days 16 hours'
            },
            youtube_subscribes_nondrop_20k_per_day_lifetime_refill: {
                id: 15491,
                name: 'Youtube Subscribes | Non Drop | 20k Per Day | Lifetime Refill | Instant Start Time',
                rate: 552.00,
                min: 100,
                max: 50000000,
                average_time: 'Not Enough Data'
            },
            youtube_subscribes_nondrop_50_80_per_day_lifetime_refill: {
                id: 15760,
                name: 'Youtube Subscribes | Non Drop | 50\\80 Per Day | Lifetime Refill | 1 Hour Start Time',
                rate: 98.979,
                min: 100,
                max: 100000,
                average_time: '12 days 20 hours'
            },
            youtube_retention_views_10_12_sec_50k_day_lifetime_refill: {
                id: 15866,
                name: 'YouTube Retention Views | 10-12 Sec | 50K Per Day | HQ Non Drop | Lifetime Refill | 0-1 Hour Start Time',
                rate: 102.308,
                min: 100,
                max: 1000000,
                average_time: '18 hours 58 minutes'
            },
            youtube_retention_views_30_35_sec_50k_day_lifetime_refill: {
                id: 15867,
                name: 'YouTube Retention Views | 30-35 Sec | 50K Per Day | HQ Non Drop | Lifetime Refill | 0-1 Hour Start Time',
                rate: 112.54,
                min: 100,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            youtube_retention_views_60_65_sec_50k_day_lifetime_refill: {
                id: 15868,
                name: 'YouTube Retention Views | 60-65 Sec | 50K Per Day | HQ Non Drop | Lifetime Refill | 0-1 Hour Start Time',
                rate: 121.492,
                min: 100,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            youtube_views_retention_30_45_sec_lifetime_refill_1k_day: {
                id: 15677,
                name: 'Youtube Views | Retention 30 - 45 Sec | Lifetime Refill | 1K Per Day | 1 - 5 Hours Start Time',
                rate: 111.978,
                min: 100,
                max: 10000000,
                average_time: '21 hours 8 minutes'
            },
            youtube_views_retention_1_minute_lifetime_refill_1k_day: {
                id: 15678,
                name: 'Youtube Views | Retention 1 Minute | Lifetime Refill | 1K Per Day | 1 - 5 Hours Start Time',
                rate: 183.236,
                min: 100,
                max: 10000000,
                average_time: 'Not Enough Data'
            },
            youtube_views_retention_2_3_minute_lifetime_refill_1k_day: {
                id: 15679,
                name: 'Youtube Views | Retention 2 - 3 Minute | Lifetime Refill | 1K Per Day | 1 - 5 Hours Start Time',
                rate: 244.315,
                min: 100,
                max: 10000000,
                average_time: 'Not Enough Data'
            },
            youtube_real_person_views_200k_day_nondrop: {
                id: 15195,
                name: 'Youtube Real Person Views | 200K Per Day | Non Drop',
                rate: 171.00,
                min: 5000,
                max: 5000000,
                average_time: 'Not Enough Data'
            },
            youtube_revenue_views_nondrop_12_hours_start_time: {
                id: 15197,
                name: 'Youtube Revenue Views | Non Drop | 12 Hours Start Time',
                rate: 191.8,
                min: 1000,
                max: 50000,
                average_time: 'Not Enough Data'
            },
            youtube_hq_views_50k_day_instant: {
                id: 15447,
                name: 'Youtube HQ Views | 50K Petr Day | Instant',
                rate: 166.782,
                min: 100,
                max: 10000000,
                average_time: '14 hours 26 minutes'
            },
            youtube_updated_views_5_10k_day_nondrop_lifetime_refill: {
                id: 15824,
                name: 'Youtube Updated Views | 5/10K Per Day | Non Drop | Lifetime Refill |',
                rate: 102.00,
                min: 100,
                max: 500000,
                average_time: '17 hours 27 minutes'
            },
            youtube_views_nondrop_50k_day_lifetime_refill: {
                id: 15836,
                name: 'Youtube Views | Non Drop | 50K Per Day | Lifetime Refill',
                rate: 108.202,
                min: 100,
                max: 20000000,
                average_time: '3 days 5 hours'
            },
            youtube_real_user_views_nondrop_100k_day_lifetime_refill: {
                id: 15703,
                name: 'Youtube Real User Views | Non Drop | 100K Per Day | Lifetime Refill',
                rate: 93.6,
                min: 100,
                max: 10000000,
                average_time: '23 hours'
            },
            youtube_views_1k_day_lifetime_refill: {
                id: 15132,
                name: 'Youtube Views | 1K Per Day | Lifetime Refill | 0-1 Hour Start Time',
                rate: 64.35,
                min: 100,
                max: 10000000,
                average_time: '3 days 2 hours'
            },
            youtube_views_nodrop_1_2k_day_real_ads: {
                id: 15635,
                name: 'Youtube Views | No Drop | 1 - 2K Per Day| Real Ads | 0 - 12 Hours Start Time',
                rate: 182.383,
                min: 1000,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            youtube_likes_fast_no_refill: {
                id: 15539,
                name: 'Youtube Likes | Fast | No Refill',
                rate: 4.32,
                min: 10,
                max: 10000,
                average_time: '10 minutes 15 seconds'
            },
            youtube_likes_fast_no_refill_500k_day: {
                id: 15540,
                name: 'Youtube Likes | Fast | No Refill | 500K Per Day',
                rate: 4.8,
                min: 10,
                max: 1000000,
                average_time: '8 hours 58 minutes'
            },
            youtube_likes_super_fast_30d_refill_hq: {
                id: 15541,
                name: 'Youtube Likes | Super Fast | 30 Days Refill | HQ | 500K Per Day',
                rate: 7.2,
                min: 10,
                max: 1000000,
                average_time: '2 hours 10 minutes'
            },
            youtube_likes_super_fast_90d_refill_hq: {
                id: 15542,
                name: 'Youtube Likes | Super Fast | 90 Days Refill | HQ | 500K Per Day',
                rate: 8.16,
                min: 10,
                max: 1000000,
                average_time: '40 minutes 5 seconds'
            },
            youtube_likes_super_fast_365d_refill_hq: {
                id: 15543,
                name: 'Youtube Likes | Super Fast | 365 Days Refill | HQ | 500K Per Day',
                rate: 12.052,
                min: 10,
                max: 1000000,
                average_time: '2 hours 23 minutes'
            },
            youtube_likes_super_fast_lifetime_refill_hq: {
                id: 15311,
                name: 'Youtube Likes | Super Fast | Lifetime Refill | HQ | 500K Per Day',
                rate: 17.4,
                min: 100,
                max: 300000,
                average_time: '23 minutes 37 seconds'
            },
            youtube_short_likes_10k_day: {
                id: 14982,
                name: '3083 - Youtube Short Likes | 10K Per Day | 0 - 1 Hour Start Time',
                rate: 12.168,
                min: 10,
                max: 20000,
                average_time: '3 minutes 26 seconds'
            },
            youtube_short_views_5_drop_possible_lifetime_refill: {
                id: 15628,
                name: 'Youtube Short Views | 5 % Drop Possible | Lifetime Refill | 1 - 2K Per Day | 1 Hour Start Time',
                rate: 106.952,
                min: 100,
                max: 1000000,
                average_time: '2 days 10 hours'
            },
            youtube_live_stream_view_stay_time_15_minutes: {
                id: 15577,
                name: 'YouTube Live Stream View | Stay Time - 15 Minutes',
                rate: 4.32,
                min: 50,
                max: 50000,
                average_time: '6 hours 49 minutes'
            },
            youtube_live_stream_view_stay_time_30_minutes: {
                id: 15578,
                name: 'YouTube Live Stream View | Stay Time - 30 Minutes',
                rate: 8.4,
                min: 50,
                max: 50000,
                average_time: 'Not Enough Data'
            },
            youtube_live_stream_view_stay_time_60_minutes: {
                id: 15579,
                name: 'YouTube Live Stream View | Stay Time - 60 Minutes',
                rate: 17.292,
                min: 50,
                max: 50000,
                average_time: '22 minutes 37 seconds'
            },
            youtube_live_stream_view_stay_time_90_minutes: {
                id: 15580,
                name: 'YouTube Live Stream View | Stay Time - 90 Minutes',
                rate: 25.344,
                min: 50,
                max: 50000,
                average_time: 'Not Enough Data'
            },
            youtube_live_stream_view_stay_time_2_hours: {
                id: 15581,
                name: 'YouTube Live Stream View | Stay Time - 2 Hours',
                rate: 35.784,
                min: 50,
                max: 50000,
                average_time: 'Not Enough Data'
            },
            youtube_live_stream_view_stay_time_3_hours: {
                id: 15582,
                name: 'YouTube Live Stream View | Stay Time - 3 Hours',
                rate: 51.876,
                min: 50,
                max: 50000,
                average_time: 'Not Enough Data'
            },
            youtube_live_stream_view_stay_time_4_hours: {
                id: 15583,
                name: 'YouTube Live Stream View | Stay Time - 4 Hours',
                rate: 67.98,
                min: 50,
                max: 50000,
                average_time: 'Not Enough Data'
            },
            youtube_live_stream_view_stay_time_6_hours: {
                id: 15584,
                name: 'YouTube Live Stream View | Stay Time - 6 Hours',
                rate: 100.2,
                min: 50,
                max: 50000,
                average_time: 'Not Enough Data'
            },
            youtube_live_stream_view_stay_time_12_hours: {
                id: 15585,
                name: 'YouTube Live Stream View | Stay Time - 12 Hours',
                rate: 199.08,
                min: 50,
                max: 50000,
                average_time: 'Not Enough Data'
            },
            youtube_live_stream_view_stay_time_24_hours: {
                id: 15586,
                name: 'YouTube Live Stream View | Stay Time - 24 Hours',
                rate: 397.153,
                min: 50,
                max: 50000,
                average_time: 'Not Enough Data'
            },
            youtube_live_stream_views_likes_15_minutes: {
                id: 15629,
                name: 'Youtube Live Stream Views + Likes [15 Minutes]',
                rate: 6.959,
                min: 100,
                max: 5000000,
                average_time: 'Not Enough Data'
            },
            youtube_live_stream_views_likes_30_minutes: {
                id: 15630,
                name: 'Youtube Live Stream Views + Likes [30 Minutes]',
                rate: 12.764,
                min: 100,
                max: 5000000,
                average_time: 'Not Enough Data'
            },
            youtube_live_stream_views_likes_60_minutes: {
                id: 15631,
                name: 'Youtube Live Stream Views + Likes [60 Minutes]',
                rate: 23.202,
                min: 100,
                max: 5000000,
                average_time: 'Not Enough Data'
            },
            youtube_live_stream_views_likes_90_minutes: {
                id: 15632,
                name: 'Youtube Live Stream Views + Likes [90 Minutes]',
                rate: 37.119,
                min: 100,
                max: 5000000,
                average_time: 'Not Enough Data'
            },
            youtube_live_stream_views_likes_120_minutes: {
                id: 15633,
                name: 'Youtube Live Stream Views + Likes [120 Minutes]',
                rate: 88.165,
                min: 100,
                max: 5000000,
                average_time: 'Not Enough Data'
            },
            youtube_live_stream_views_likes_180_minutes: {
                id: 15634,
                name: 'Youtube Live Stream Views + Likes [180 Minutes]',
                rate: 150.812,
                min: 100,
                max: 5000000,
                average_time: 'Not Enough Data'
            },
            youtube_comment_likes_10k_day_ultrafast_30d_refill: {
                id: 14977,
                name: 'YouTube Comment Likes | 10K Per Day | Ultra Fast | 30 Days Refill',
                rate: 22.498,
                min: 10,
                max: 500000,
                average_time: '52 seconds'
            },
            youtube_indian_custom_comments_30d_refill_nondrop: {
                id: 15100,
                name: 'Youtube Indian Custom Comments | 30 Days Refill | Non Drop',
                rate: 969.00,
                min: 100,
                max: 50000,
                average_time: 'Not Enough Data'
            },
            youtube_indian_custom_comments_fast_30d_refill_nondrop: {
                id: 15101,
                name: 'Youtube Indian Custom Comments | Fast | 30 Days Refill | Non Drop',
                rate: 936.427,
                min: 100,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            youtube_custom_comments_fast_30d_refill_nondrop_1: {
                id: 15102,
                name: 'Youtube Custom Comments | Fast | 30 Days Refill | Non Drop',
                rate: 235.98,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            youtube_custom_comments_fast_30d_refill_nondrop_2: {
                id: 15103,
                name: 'Youtube Custom Comments | Fast | 30 Days Refill | Non Drop',
                rate: 225.72,
                min: 10,
                max: 100000,
                average_time: '2 days 19 hours'
            },
            youtube_custom_comments_fast_30d_refill_nondrop_3: {
                id: 15104,
                name: 'Youtube Custom Comments | Fast | 30 Days Refill | Non Drop',
                rate: 247.015,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            youtube_indian_random_comments_slow_nondrop: {
                id: 15105,
                name: 'Youtube Indian Random Comments | Slow| Non Drop',
                rate: 889.409,
                min: 500,
                max: 300000,
                average_time: 'Not Enough Data'
            },
            youtube_indian_custom_comments_slow_30d_refill_nondrop: {
                id: 15106,
                name: 'Youtube Indian Custom Comments | Slow | 30 Days Refill | Non Drop',
                rate: 924.449,
                min: 100,
                max: 300000,
                average_time: 'Not Enough Data'
            }
        }
    },
    facebook: {
        name: 'Facebook Services',
        services: {
            facebook_followers_page_profile_nondrop_30d_refill_100k_day: {
                id: 15841,
                name: 'Facebook Followers | Page\\Profile | Non Drop | 30 Days Refill | 100K Per Day | Instant Start',
                rate: 46.644,
                min: 100,
                max: 1000000,
                average_time: 'Not Enough Data'
            },
            facebook_followers_page_profile_lowdrop_no_refill_30k_day: {
                id: 15690,
                name: 'Facebook Followers | Page\\Profile | Low Drop | No Refill | 30K Per Day | 0-1 Hour Start Time',
                rate: 52.485,
                min: 10,
                max: 100000,
                average_time: '15 hours 12 minutes'
            },
            facebook_followers_page_profile_nondrop_30d_refill_100k_day_2: {
                id: 15691,
                name: 'Facebook Followers | Page\\Profile | Non Drop | 30 Days Refill | 100K Per Day | Instant Start',
                rate: 58.639,
                min: 10,
                max: 8000000,
                average_time: '44 minutes 44 seconds'
            },
            facebook_followers_page_profile_nondrop_365d_refill_300k_day: {
                id: 15692,
                name: 'Facebook Followers | Page\\Profile | Non Drop | 365 Days Refill | 300K Per Day | Instant Start',
                rate: 69.439,
                min: 10,
                max: 50000000,
                average_time: 'Not Enough Data'
            },
            facebook_followers_page_profile_nondrop_lifetime_refill_300k_day: {
                id: 15693,
                name: 'Facebook Followers | Page\\Profile | Non Drop | Lifetime Refill | 300K Per Day | Instant Start',
                rate: 79.039,
                min: 10,
                max: 50000000,
                average_time: 'Not Enough Data'
            },
            facebook_followers_page_profile_nondrop_365d_refill_50k_day: {
                id: 15788,
                name: 'Facebook Followers | Page\\Profile | Non Drop | 365 Days Refill | 50K Per Day | Instant Start',
                rate: 58.517,
                min: 50,
                max: 5000000,
                average_time: 'Not Enough Data'
            },
            facebook_group_members_no_refill_50k_day: {
                id: 15848,
                name: 'Facebook Group Members | No Refill | 50K Per Day | 10 Minutes Time',
                rate: 57.548,
                min: 30,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            facebook_group_members_lifetime_refill_50k_day: {
                id: 15849,
                name: 'Facebook Group Members | Lifetime Refill | 50K Per Day | 10 Minutes Time',
                rate: 62.664,
                min: 30,
                max: 300000,
                average_time: 'Not Enough Data'
            },
            facebook_post_like_nondrop_super_fast_instant_300k_day: {
                id: 15842,
                name: 'Facebook Post Like | Non Drop | Super Fast | Instant | 300K Per Day',
                rate: 27.065,
                min: 20,
                max: 500000,
                average_time: 'Not Enough Data'
            },
            facebook_post_likes_nondrop_30d_refill_5_10k_day: {
                id: 14708,
                name: 'Facebook Post Likes | Non Drop | 30 Days Refill | 5-10K Per Day | 1 Hour Start Time',
                rate: 25.944,
                min: 20,
                max: 500000,
                average_time: '5 hours 53 minutes'
            },
            facebook_page_likes_followers_hq_100k_day_no_refill: {
                id: 15761,
                name: 'Facebook Page Likes and Followers | High Quality | 100K Per Day | No Refill | 0-1 Hour Start Time',
                rate: 101.562,
                min: 100,
                max: 500000,
                average_time: 'Not Enough Data'
            },
            facebook_page_likes_followers_hq_100k_day_30d_refill: {
                id: 15762,
                name: 'Facebook Page Likes and Followers | High Quality | 100K Per Day | 30 Days Refill | 0-1 Hour Start Time',
                rate: 106.64,
                min: 100,
                max: 500000,
                average_time: 'Not Enough Data'
            },
            facebook_page_likes_followers_hq_100k_day_90d_refill: {
                id: 15763,
                name: 'Facebook Page Likes and Followers | High Quality | 100K Per Day | 90 Days Refill | 0-1 Hour Start Time',
                rate: 111.719,
                min: 100,
                max: 500000,
                average_time: 'Not Enough Data'
            },
            facebook_page_likes_followers_hq_100k_day_365d_refill: {
                id: 15764,
                name: 'Facebook Page Likes and Followers | High Quality | 100K Per Day | 365 Days Refill | 0-1 Hour Start Time',
                rate: 116.797,
                min: 100,
                max: 500000,
                average_time: 'Not Enough Data'
            },
            facebook_page_likes_followers_hq_100k_day_lifetime_refill: {
                id: 15765,
                name: 'Facebook Page Likes and Followers | High Quality | 100K Per Day | Lifetime Refill | 0-1 Hour Start Time',
                rate: 121.876,
                min: 100,
                max: 500000,
                average_time: 'Not Enough Data'
            },
            facebook_post_likes_less_drop_no_refill_50k_day: {
                id: 15780,
                name: 'Facebook Post Likes | Less Drop | No Refill | 50K Per Day | Instant Start',
                rate: 40.188,
                min: 20,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            facebook_post_likes_low_drop_30d_refill_100k_day: {
                id: 15781,
                name: 'Facebook Post Likes | Low Drop | 30 Days Refill | 100K Per Day | Instant Start',
                rate: 46.08,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            facebook_post_likes_indian_mixed_nondrop_365d_refill: {
                id: 15782,
                name: 'Facebook Post Likes | Indian Mixed | Non Drop | 365 Days Refill | 100-200K Per Day | Instant Start',
                rate: 54.00,
                min: 10,
                max: 500000,
                average_time: 'Not Enough Data'
            },
            facebook_post_likes_indian_mixed_nondrop_lifetime_refill: {
                id: 15783,
                name: 'Facebook Post Likes | Indian Mixed | Non Drop | Lifetime Refill | 100-200K Per Day | Instant Start',
                rate: 72.00,
                min: 10,
                max: 500000,
                average_time: 'Not Enough Data'
            },
            facebook_reels_views_low_drop_200k_day_no_refill: {
                id: 15694,
                name: 'Facebook Reels Views | Low Drop | 200K Per Day | No Refill | 1-6 Hours',
                rate: 9.6,
                min: 200,
                max: 10000000,
                average_time: '1 hour 1 minute'
            },
            facebook_post_reaction_likes_hq_nondrop_5k_hour_no_refill: {
                id: 15766,
                name: 'Facebook Post Reaction | Likes 👍 | HQ | Non Drop | 5K Per hour | No Refill | Instant Start',
                rate: 24.936,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            facebook_post_reaction_love_hq_nondrop_5k_hour_no_refill: {
                id: 15767,
                name: 'Facebook Post Reaction | Love ♥️ | HQ | Non Drop | 5K Per hour | No Refill | Instant Start',
                rate: 24.936,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            facebook_post_reaction_care_hq_nondrop_5k_hour_no_refill: {
                id: 15768,
                name: 'Facebook Post Reaction | Care 🤗 | HQ | Non Drop | 5K Per hour | No Refill | Instant Start',
                rate: 24.936,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            facebook_post_reaction_wow_hq_nondrop_5k_hour_no_refill: {
                id: 15769,
                name: 'Facebook Post Reaction | Wow 😲 | HQ | Non Drop | 5K Per hour | No Refill | Instant Start',
                rate: 24.936,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            facebook_post_reaction_haha_hq_nondrop_5k_hour_no_refill: {
                id: 15770,
                name: 'Facebook Post Reaction | Haha 😂 | HQ | Non Drop | 5K Per hour | No Refill | Instant Start',
                rate: 24.936,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            facebook_post_reaction_sad_hq_nondrop_5k_hour_no_refill: {
                id: 15771,
                name: 'Facebook Post Reaction | Sad 😢 | HQ | Non Drop | 5K Per hour | No Refill | Instant Start',
                rate: 24.936,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            facebook_post_reaction_angry_hq_nondrop_5k_hour_no_refill: {
                id: 15772,
                name: 'Facebook Post Reaction | Angry 😡 | HQ | Non Drop | 5K Per hour | No Refill | Instant Start',
                rate: 24.936,
                min: 10,
                max: 100000,
                average_time: 'Not Enough Data'
            },
            facebook_comment_likes_drop_possible_5_days_refill: {
                id: 8345,
                name: 'Facebook Comment Likes | Drop Possible | 5 Days Refill',
                rate: 130.467,
                min: 10,
                max: 10000,
                average_time: '15 hours 20 minutes'
            },
            facebook_comment_likes_nodrop_lifetime_refill_100_300k_day: {
                id: 8346,
                name: 'Facebook Comment Likes | No Drop | Lifetime Refill | 100-300K Per Day | 1 Hour Start Time',
                rate: 313.121,
                min: 50,
                max: 10000,
                average_time: '2 hours 15 minutes'
            },
            facebook_costum_comments_100_per_day_no_refill_unexpected_drop: {
                id: 8347,
                name: 'Facebook Costum Comments | 100 Per Day | No Refill | Unexpected Drop | 0-6 Hour Start Time',
                rate: 1320.003,
                min: 20,
                max: 5000,
                average_time: 'Not enough data'
            },
            fb_comment_likes_nodrop_lifetime_100_300_day: {
                id: 8348,
                name: 'FB Comment Likes [No Drop] [Lifetime] [100-300/D] [0-8/H]',
                rate: 730.615,
                min: 20,
                max: 50000,
                average_time: '1 hour 49 minutes'
            },
            facebook_random_comments_nodrop_30d_refill_100_per_day: {
                id: 8351,
                name: 'Facebook Random Comments | No Drop | 30 Days Refill | 100 Per Day | 0-24 Hour Start Time',
                rate: 1877.637,
                min: 10,
                max: 500,
                average_time: '280 hours 23 minutes'
            },
            facebook_custom_comments_nodrop_30d_refill_100_per_day: {
                id: 8352,
                name: 'Facebook custom Comments | No Drop | 30 Days Refill | 100 Per Day | 0-24 Hour Start Time',
                rate: 1877.637,
                min: 10,
                max: 1000,
                average_time: '298 hours 8 minutes'
            },
            facebook_60k_minutes_monetization_100k_day: {
                id: 9102,
                name: 'Facebook 60K Minutes | Monetization | 100K Per Day | 0-24 Hour Start Time | 120+ Minutes',
                rate: 110.645,
                min: 1000,
                max: 1000,
                average_time: '2 hours 32 minutes'
            },
            facebook_120k_minutes_monetization_100k_day: {
                id: 9103,
                name: 'Facebook 120K Minutes | Monetization | 100K Per Day | 0-24 Hour Start Time | 120+ Minutes',
                rate: null, // Rate is missing in the provided data
                min: null, // Min order is missing
                max: null, // Max order is missing
                average_time: null // Average time is missing
            }
        }
    }
};

const SERVICE_RATES = {
    '14732': 101.85,
    '14733': 48.874,
    '15873': 0.488,
    '15874': 80.176,
    '15875': 91.011,
    '15876': 101.845,
    '14734': 48.874,
    '14735': 61.741,
    '15837': 57.571,
    '15838': 62.901,
    '15839': 66.1,
    '15840': 70.365,
    '15697': 109.411,
    '15735': 100000.00,
    '15833': 75.336,
    '15726': 84.895,
    '15727': 62.18,
    '15728': 74.66,
    '15592': 96.00,
    '15877': 1.356,
    '15732': 1.872,
    '15351': 0.96,
    '15731': 1.02,
    '15729': 0.128,
    '15835': 0.103,
    '15789': 0.144,
    '15724': 0.084,
    '15681': 0.168,
    '15564': 1.14,
    '15492': 78.00,
    '15640': 547.2,
    '15733': 476.543,
    '15734': 376.714,
    '15574': 16.8,
    '15462': 10.2,
    '14640': 4.914,
    '15544': 24.036,
    '15525': 26.79,
    '15526': 26.183,
    '15528': 32.49,
    '15527': 39.9,
    '15529': 57.182,
    '15702': 90.811,
    '15471': 118.8,
    '14808': 433.2,
    '14857': 252.00,
    '14858': 243.796,
    '15637': 144.00,
    '15708': 81.6,
    '15709': 82.8,
    '14486': 103.2,
    '14489': 103.591,
    '14487': 68.736,
    '14488': 68.736,
    '12744': 136.562,
    '15397': 0.645,
    '14954': 2.381,
    '15398': 5.38,
    '14681': 0.403,
    '15588': 1.092,
    '15648': 0.855,
    '15368': 53.4,
    '15369': 52.954,
    '15370': 53.4,
    '15371': 52.954,
    '15372': 52.954,
    '15373': 52.954,
    '15374': 54.154,
    '15375': 52.954,
    '15376': 61.354,
    '15377': 54.154,
    '15378': 52.954,
    '15379': 52.954,
    '12238': 26.74,
    '12240': 13.745,
    '12241': 15.86,
    '14678': 7.8,
    '14679': 7.787,
    '15722': 3.754,
    '15331': 3.00,
    '15330': 2.04,
    '14235': 4.41,
    '14561': 102.096,
    '14562': 243.412,
    '14563': 121.706,
    '15500': 1275.38,
    '15501': 1382.107,
    '15704': 166.224,
    '15705': 167.424,
    '15706': 167.424,
    '15707': 167.424,
    '14901': 50.00,
    '14902': 50.00,
    '14903': 50.00,
    '14950': 50.00,
    '15523': 100.00,
    '15041': 159.00,
    '15040': 239.00,
    '15042': 499.00,
    '15524': 140.00,
    '15043': 199.00,
    '15044': 99.00,
    '15045': 99.00,
    '15046': 149.00,
    '15047': 149.00,
    '15048': 149.00,
    '15049': 239.00,
    '15050': 10000.00,
    '15468': 88.579,
    '15467': 78.315,
    '15469': 91.2,
    '15855': 19.212,
    '15594': 2.7,
    '15456': 8.28,
    '15863': 0.664,
    '15864': 1.422,
    '14661': 450.00,
    '14659': 700.00,
    '14660': 1350.00,
    '14662': 3500.00,
    '15843': 62.627,
    '15844': 69.336,
    '15845': 78.446,
    '15846': 81.556,
    '15847': 87.065,
    '15390': 56.667,
    '15609': 0.216,
    '15610': 1.968,
    '15611': 3.936,
    '15612': 7.944,
    '15613': 11.64,
    '15614': 15.6,
    '15615': 20.4,
    '15616': 40.284,
    '15617': 79.367,
    '15618': 189.932,
    '15619': 402.835,
    '15557': 2.561,
    '15558': 3.842,
    '15559': 5.123,
    '15560': 7.791,
    '15561': 12.807,
    '15562': 25.613,
    '15563': 51.227,
    '15744': 207.493,
    '15745': 290.491,
    '15746': 357.926,
    '15736': 243.805,
    '15737': 446.111,
    '15738': 518.734,
    '15739': 1037.467,
    '15740': 1193.087,
    '15741': 1597.7,
    '15742': 2023.061,
    '15743': 3475.515,
    '15556': 10.459,
    '11255': 26.069,
    '11256': 28.805,
    '11257': 29.325,
    '15826': 780.00,
    '15486': 120.00,
    '15487': 126.00,
    '15488': 174.00,
    '15490': 264.00,
    '15491': 552.00,
    '15760': 98.979,
    '15866': 102.308,
    '15867': 112.54,
    '15868': 121.492,
    '15677': 111.978,
    '15678': 183.236,
    '15679': 244.315,
    '15195': 171.00,
    '15197': 191.8,
    '15447': 166.782,
    '15824': 102.00,
    '15836': 108.202,
    '15703': 93.6,
    '15132': 64.35,
    '15635': 182.383,
    '15539': 4.32,
    '15540': 4.8,
    '15541': 7.2,
    '15542': 8.16,
    '15543': 12.052,
    '15311': 17.4,
    '14982': 12.168,
    '15628': 106.952,
    '15577': 4.32,
    '15578': 8.4,
    '15579': 17.292,
    '15580': 25.344,
    '15581': 35.784,
    '15582': 51.876,
    '15583': 67.98,
    '15584': 100.2,
    '15585': 199.08,
    '15586': 397.153,
    '15629': 6.959,
    '15630': 12.764,
    '15631': 23.202,
    '15632': 37.119,
    '15633': 88.165,
    '15634': 150.812,
    '14977': 22.498,
    '15100': 969.00,
    '15101': 936.427,
    '15102': 235.98,
    '15103': 225.72,
    '15104': 247.015,
    '15105': 889.409,
    '15106': 924.449,
    '15841': 46.644,
    '15690': 52.485,
    '15691': 58.639,
    '15692': 69.439,
    '15693': 79.039,
    '15788': 58.517,
    '15848': 57.548,
    '15849': 62.664,
    '15842': 27.065,
    '14708': 25.944,
    '15761': 101.562,
    '15762': 106.64,
    '15763': 111.719,
    '15764': 116.797,
    '15765': 121.876,
    '15780': 40.188,
    '15781': 46.08,
    '15782': 54.00,
    '15783': 72.00,
    '15694': 9.6,
    '15766': 24.936,
    '15767': 24.936,
    '15768': 24.936,
    '15769': 24.936,
    '15770': 24.936,
    '15771': 24.936,
    '15772': 24.936,
    '8345': 130.467,
    '8346': 313.121,
    '8347': 1320.003,
    '8348': 730.615,
    '8351': 1877.637,
    '8352': 1877.637,
    '9102': 110.645,
    '9103': null
};

const SERVICE_NAMES = {
    '14732': 'Twitter Followers [ X ] | 100k/D | Non Refil | Super instant',
    '14733': 'Twitter Retweet [ X ] | 100k/D | Max 100k | Super instant',
    '15873': 'Twitter [ X ] | Tweet video Views | Speed 50/80 M Per Day | Instant',
    '15874': 'Twitter Likes [ X ] | 100k/D | Super Fast | instant',
    '15875': 'Twitter Likes [ X ] | 100k/D | Super Fast | Refill 30 Days | instant ♻️⚡',
    '15876': 'Twitter Likes [ X ] | 100k/D | Super Fast | Refill - Lifetime | instant ♻️⚡',
    '14734': 'Twitter likes - Favori [ X ] | 100k/D | Max 100k | Super instant',
    '14735': 'Twitter Bookmars [ X ] | 100k/D | Non Refil | Super instant',
    '15837': 'Instagram Followers | Old Accounts With 15 Posts | 30k Per Day ] - ⚡🔥',
    '15838': 'Instagram Followers | Old Accounts With 15 Posts | 30k Per Day | 30 Days Refill',
    '15839': 'Instagram Followers | Old Accounts With 15 Posts | 30k Per Day | 365 Days Refill',
    '15840': 'Instagram Followers | Old Accounts With 15 Posts | 30k Per Day | Lifetime Refill',
    '15697': 'Instagram Zero Drop followers | Auto Refill Every 24 Hours |',
    '15735': 'For 100K Or Above Profiles',
    '15833': 'Instagram Followers | Non Drop | Lifetime Refill | Ultra Fast | One Click Done I',
    '15726': 'Instagram Followers | Non Drop | 365 Days Refill | 500K Per Day',
    '15727': 'Instagram Followers | Low Drop | 30 Days Refill | 100K Per Day',
    '15728': 'Instagram Followers | Low Drop | 365 Days Refill | 100K Per Day',
    '15592': 'Instagram Followers |Always Non Drop | Lifetime Refill | Ultra Fast | One Click Done | 1M Per Day',
    '15877': 'Instagram Likes | Old Account With Profile Post | 50K Per Hour | Lifetime Refill | One Click Done',
    '15732': 'Instagram Likes | Old Account With Profile Post | 500k Per Hour | Lifetime Refill | One Click Done',
    '15351': 'Instagram Likes | Old Account With Profile Post | 50K Per Day | No Refill',
    '15731': 'Instagram Likes | Old Account With Profile Post | 200K Per Day | 365 Days Refill',
    '15729': 'Instagram Reels Views | No Stuck | 200-400k Per Hour|',
    '15835': 'Instagram Views if Another Service Stuck',
    '15789': 'Instagram Reels Views | 300K Per Hour | No Stuck',
    '15724': 'Instagram Reels Views | 200K Per Day | Good Working',
    '15681': 'Instagram Reels Views | 500K Per Hour | Ultra Fast | One Click Done',
    '15564': 'Instagram Views On Photo Or Carouse',
    '15492': 'Instagram Indian Custom Comment | Start 0 - 6 Hours',
    '15640': 'Instagram Custom Comments | 100% Indian Real Accounts | 300-500 Per Day',
    '15733': 'Instagram Custom Comments | 5K Per Day | Instant Start',
    '15734': 'Instagram Random Comments | 5K Per Day |Instant Start',
    '15574': 'Instagram Real Indian Quantity Likes | Super Fast | One Click Done',
    '15462': 'Instagram Indian Mix Likes | Over Delivery | 100K Per Hour |',
    '14640': 'Instagram Indian Mix Likes | Slow | 20K Per Day | 30 Days Refill|',
    '15544': 'Instagram Active Profile Indian Likes | 100% Active Indian | 20K Per Day',
    '15525': 'Instagram Active Profile Indian Likes | 100% Active Indian | 50K Per Day',
    '15526': 'Instagram Active Profile Indian Likes | 100% Active Indian | 50K Per Day | Instant Start',
    '15528': 'Instagram Active Profile Indian Likes | 100% Active Indian | 30K Per Day',
    '15527': 'Instagram Active Profile Indian Likes | 100% Active Indian | 20K Per Day',
    '15529': 'Instagram Active Profile Indian Likes | 100% Active Indian | 30K Per Day',
    '15702': 'Instagram 100% Pure Active Indian Followers | Low Drop | 200K Per Day | 365 Days Refill | One Click Done',
    '15471': 'IInstagram 90% Pure Active Indian Followers | Low Drop | 2K Per Day l Lifetime Refill | 1 Hour Start Time',
    '14808': 'Instagram Indian Followers | Influencers Quality | Slow | 1K Per Day',
    '14857': 'Instagram 100% Pure Indian Followers | Low Drop | 20K Per Day | Lifetime Refill | One Click Done',
    '14858': 'Instagram 100% Pure Indian Followers | Low Drop | 3K Per Day | Lifetime Refill',
    '15637': 'Instagram Indian Mixed Followers | Low Drop | 200K Per Day | 365 Days Refill | One Click Done',
    '15708': 'Instagram 100% Pure Indian Followers | Low Drop | 200K Per Day | No Refill | One Click Done',
    '15709': 'Instagram 100% Pure Indian Followers | Low Drop | 200K Per Day | 30 Days Refill | One Click Done',
    '14486': 'Instagram Story Poll Votes | Instant | First Vote | Working',
    '14489': 'Instagram Story Poll Votes | Instant | Second Vote | Working',
    '14487': 'Instagram Story Poll Votes | Instant | Third Vote | Working',
    '14488': 'Instagram Story Poll Votes | Instant | Fourth Vote | Working',
    '12744': 'Instagram Story Poll Votes | Working',
    '15397': 'Instagram Share | Instant | Working | Stable',
    '14954': 'Instagram Share | Instant | Working | Stable 365 Days Refill',
    '15398': 'Instagram Share + Enagement | Instant | Working | Stable',
    '14681': 'Instagram Post\\Reels Save | Instant | Indian Download | 50K Per Day',
    '15588': 'Instagram Share | Instant | Working | Stable',
    '15648': 'Instagram Share | Instant | Working | Stable',
    '15368': 'Instagram Channel Member | Real And Active | Ultra Fast | Global',
    '15369': 'Instagram Channel Member | Real And Active | Ultra Fast | USA',
    '15370': 'Instagram Channel Member | Real And Active | Ultra Fast | Arab',
    '15371': 'Instagram Channel Member | Real And Active | Ultra Fast | Turkey',
    '15372': 'Instagram Channel Member | Real And Active | Ultra Fast | Azerbaijan',
    '15373': 'Instagram Channel Member | Real And Active | Ultra Fast | Latin America',
    '15374': 'Instagram Channel Member | Real And Active | Ultra Fast | Indian',
    '15375': 'Instagram Channel Member | Real And Active | Ultra Fast | Brazil',
    '15376': 'Instagram Channel Member | Real And Active | Ultra Fast | Vietnam',
    '15377': 'Instagram Channel Member | Real And Active | Ultra Fast | Thailand',
    '15378': 'Instagram Channel Member | Real And Active | Ultra Fast | Nigeria',
    '15379': 'Instagram Channel Member | Real And Active | Ultra Fast | Pakistan',
    '12238': 'Instagram Story Impression | Instant',
    '12240': 'Instagram Story Views + Profile Visits',
    '12241': 'Instagram Story Views + Impressions | 10K/D | 0-1/H Start Time',
    '14678': 'Instagram Story Views | Female Majority | One Click Done',
    '14679': 'Instagram Story Views | Majority Indian | 200K Per Day',
    '15722': 'Instagram Story Views | Working',
    '15331': 'Instagram Reach + Impression | Non Drop | Instant',
    '15330': 'Instagram Reach | Non Drop | Instant',
    '14235': 'Instagram Reach + Impression | Non Drop | Instant',
    '14561': 'Instagram Live Stream Views | 15 Minutas | Instant Start',
    '14562': 'Instagram Live Stream Views | 60 Minutas | Instant Start',
    '14563': 'Instagram Live Stream Views | 30 Minutas | Instant Start',
    '15500': 'Snapchat Followers [ Start - Instant ] [ Speed 700-1k/Day ] Refill 30 Days ♻️🔥',
    '15501': 'Snapchat Followers [ Start - Instant ] [ Speed 800-1k/Day ] Refill - Lifetime ♻️🔥',
    '15704': '𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐌𝐞𝐦𝐛𝐞𝐫𝐬 𝐆𝐨𝐨𝐝 𝐐𝐮𝐚𝐥𝐢𝐭𝐲 [ 𝐆𝐥𝐨𝐛𝐚𝐥 🌎 ] [ 𝐌𝐚𝐱 100𝐊 ] | 10𝐤/20𝐤 𝐝𝐚𝐲 | 𝐍𝐨-𝐑𝐞𝐟𝐢𝐥𝐥 ⚠️',
    '15705': '𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐌𝐞𝐦𝐛𝐞𝐫𝐬 𝐆𝐨𝐨𝐝 𝐐𝐮𝐚𝐥𝐢𝐭𝐲 [ 100% 𝐈𝐧𝐝𝐢𝐚𝐧 🇮🇳 ] [ 𝐌𝐚𝐱 100𝐊 ] | 10𝐤/20𝐤 𝐝𝐚𝐲 | 𝐍𝐨-𝐑𝐞𝐟𝐢𝐥𝐥 ⚠️',
    '15706': '𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐌𝐞𝐦𝐛𝐞𝐫𝐬 𝐆𝐨𝐨𝐝 𝐐𝐮𝐚𝐥𝐢𝐭𝐲 [ 𝐀𝐫𝐚𝐛 🇦🇪 ] [ 𝐌𝐚𝐱 100𝐊 ] | 10𝐤/20𝐤 𝐝𝐚𝐲 | 𝐍𝐨-𝐑𝐞𝐟𝐢𝐥𝐥 ⚠️',
    '15707': '𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐌𝐞𝐦𝐛𝐞𝐫𝐬 𝐆𝐨𝐨𝐝 𝐐𝐮𝐚𝐥𝐢𝐭𝐲 [ 𝐄𝐮𝐫𝐨𝐩𝐞 🇪🇺 ] [ 𝐌𝐚𝐱 100𝐊 ] | 10𝐤/20𝐤 𝐝𝐚𝐲 | 𝐍𝐨-𝐑𝐞𝐟𝐢𝐥𝐥 ⚠️',
    '14901': 'Netflix, Amazon Prime , Youtube & Music , spotify , Sony Live , Disney + hotstar , jio cinema ,',
    '14902': 'Unlimited random call apk',
    '14903': 'If you want any type of apk premium order this',
    '14950': 'Telegram premium Mod available',
    '15523': 'Netflix 1 month subscription',
    '15041': 'Netflix 2 Months Subscription 4k UHD',
    '15040': 'Netflix 3 Months Subscription 4k UHD',
    '15042': 'Netflix 6 Months Subscription 4k UHD',
    '15524': 'Amazon 3 months subscription',
    '15043': 'Amazon Prime 6 month’s Subscription 4k UHD',
    '15044': 'Disney + Hotstar 3 month subscription',
    '15045': 'Spotify 3 month premium',
    '15046': 'Sony Liv 3 Month Subscription',
    '15047': 'Zee 5 Three Months Premium',
    '15048': 'Jio Savan 1 Year plan',
    '15049': 'Crunchy Roll 1 year subscription',
    '15050': 'If You Want Any Other Subscriptions',
    '15468': 'Telegram 100% Active And Online Member | Only In This Service | Non Drop | LIfetime Refill | 100K Per Day',
    '15467': 'Telegram 100 % Indian Member | Ultra Fast | 100K Per Day | 90 Days Refill',
    '15469': 'Telegram 100 % Indian Member | Non Drop | 100K Per Day | 90 Days Refill',
    '15855': 'Telegram Member | 100K Per Day | Lifetime Refill On Fresh | 0-1 Hour Start Time',
    '15594': 'Telegram Members | 60 Days Refill | Instant Almost',
    '15456': 'Telegram Group \\ Channel Member | 200K Per Day | No Refill',
    '15863': 'Telegram Members | 10K Per Day | No Refill | 0-1 Hour Start Time',
    '15864': 'Telegram Members | 40k Per Day | 30 Days Refill | 0-1 Hour Start Time',
    '14661': 'Telegram 6k members package',
    '14659': 'Telegram 10k Members package',
    '14660': 'Telegram 20k members',
    '14662': 'Telegram 50k members',
    '15843': 'Telegram Member | Non Drop | 100K Per Day | 30 Days Refill | 5 Minutes Start Time',
    '15844': 'Telegram Member | Non Drop | 100K Per Day | 60 Days Refill | 5 Minutes Start Time',
    '15845': 'Telegram Member | Non Drop | 100K Per Day | 90 Days Refill | 5 Minutes Start Time',
    '15846': 'Telegram Member | Non Drop | 100K Per Day | 365 Days Refill | 5 Minutes Start Time',
    '15847': 'Telegram Member | Non Drop | 100K Per Day | Lifetime Refill | 5 Minutes Start Time',
    '15390': 'Telegram Member | 50K Per Day | 10% Drop Possible | Lifetime Refill | Instant Start',
    '15609': 'TG Future Post View | 1 Post | Max Unlimited',
    '15610': 'TG Future Post View | 5 Post | Max Unlimited',
    '15611': 'TG Future Post View | 10 Post | Max Unlimited',
    '15612': 'TG Future Post View | 20 Post | Max Unlimited',
    '15613': 'TG Future Post View | 30 Post | Max Unlimited',
    '15614': 'TG Future Post View | 40 Post | Max Unlimited',
    '15615': 'TG Future Post View | 50 Post | Max Unlimited',
    '15616': 'TG Future Post View | 100 Post | Max Unlimited',
    '15617': 'TG Future Post View | 200 Post | Max Unlimited',
    '15618': 'TG Future Post View | 500 Post | Max Unlimited',
    '15619': 'TG Future Post View | 1000 Post | Max Unlimited',
    '15557': 'Telegram Views [ Last 10 Post ] ⚡',
    '15558': 'Telegram Views [ Last 15 Post ] ⚡',
    '15559': 'Telegram Views [ Last 20 Post ] ⚡',
    '15560': 'Telegram Views [ Last 30 Post ] ⚡',
    '15561': 'Telegram Views [ Last 50 Post ] ⚡',
    '15562': 'Telegram Views [ Last 100 Post ] ⚡',
    '15563': 'Telegram Views [ Last 200 Post ] ⚡',
    '15744': 'Telegram Premium Bot Start + Add Note + Activity for 7 Days | 7 Days Premium | Instant',
    '15745': 'Telegram Premium Bot Start + Add Note + Activity for15 Days | 15Days Premium | Instant',
    '15746': 'Telegram Premium Bot Start + Add Note + Activity for 30Days | 30Days Premium | Instant',
    '15736': 'Telegram Premium Members + Views | 7 Days Premium | Instant',
    '15737': 'Telegram Premium Members + Views | 14 Days Premium | Instant',
    '15738': 'Telegram Premium Members + Views | 20 - 30 Days Premium | Instant',
    '15739': 'Telegram Premium Members + Views | 30 - 60 Days Premium | Instant',
    '15740': 'Telegram Premium Members + Views | 45 Days Premium | Instant',
    '15741': 'Telegram Premium Members + Views | 60 Days Premium | Instant',
    '15742': 'Telegram Premium Members + Views | 90 Days Premium | Instant',
    '15743': 'Telegram Premium Members + Views | 180 Days Premium | Instant',
    '15556': 'Telegram vote | Instant',
    '11255': 'Telegram vote \\ Poll | Instant',
    '11256': 'Telegram vote \\ Poll | Instant',
    '11257': 'Telegram vote \\ Poll | Instant',
    '15826': 'Youtube Subscribes | Updated | Non Drop | 10/20K Per Day | Lifetime Refill | 1 Hour Start',
    '15486': 'Youtube Subscribes | Non Drop | 40\\80 Per Day | Lifetime Refill | 1 Hour Start Time',
    '15487': 'Youtube Subscribes | Non Drop | 100\\200 Per Day | Lifetime Refill | 1 Hour Start Time',
    '15488': 'Youtube Subscribes | Non Drop | 250\\300 Per Day | Lifetime Refill | 1 Hour Start Time',
    '15490': 'Youtube Subscribes | Non Drop | 4k Per Day | Lifetime Refill | 1 Hour Start Time',
    '15491': 'Youtube Subscribes | Non Drop | 20k Per Day | Lifetime Refill | Instant Start Time',
    '15760': 'Youtube Subscribes | Non Drop | 50\\80 Per Day | Lifetime Refill | 1 Hour Start Time',
    '15866': 'YouTube Retention Views | 10-12 Sec | 50K Per Day | HQ Non Drop | Lifetime Refill | 0-1 Hour Start Time',
    '15867': 'YouTube Retention Views | 30-35 Sec | 50K Per Day | HQ Non Drop | Lifetime Refill | 0-1 Hour Start Time',
    '15868': 'YouTube Retention Views | 60-65 Sec | 50K Per Day | HQ Non Drop | Lifetime Refill | 0-1 Hour Start Time',
    '15677': 'Youtube Views | Retention 30 - 45 Sec | Lifetime Refill | 1K Per Day | 1 - 5 Hours Start Time',
    '15678': 'Youtube Views | Retention 1 Minute | Lifetime Refill | 1K Per Day | 1 - 5 Hours Start Time',
    '15679': 'Youtube Views | Retention 2 - 3 Minute | Lifetime Refill | 1K Per Day | 1 - 5 Hours Start Time',
    '15195': 'Youtube Real Person Views | 200K Per Day | Non Drop',
    '15197': 'Youtube Revenue Views | Non Drop | 12 Hours Start Time',
    '15447': 'Youtube HQ Views | 50K Petr Day | Instant',
    '15824': 'Youtube Updated Views | 5/10K Per Day | Non Drop | Lifetime Refill |',
    '15836': 'Youtube Views | Non Drop | 50K Per Day | Lifetime Refill',
    '15703': 'Youtube Real User Views | Non Drop | 100K Per Day | Lifetime Refill',
    '15132': 'Youtube Views | 1K Per Day | Lifetime Refill | 0-1 Hour Start Time',
    '15635': 'Youtube Views | No Drop | 1 - 2K Per Day| Real Ads | 0 - 12 Hours Start Time',
    '15539': 'Youtube Likes | Fast | No Refill',
    '15540': 'Youtube Likes | Fast | No Refill | 500K Per Day',
    '15541': 'Youtube Likes | Super Fast | 30 Days Refill | HQ | 500K Per Day',
    '15542': 'Youtube Likes | Super Fast | 90 Days Refill | HQ | 500K Per Day',
    '15543': 'Youtube Likes | Super Fast | 365 Days Refill | HQ | 500K Per Day',
    '15311': 'Youtube Likes | Super Fast | Lifetime Refill | HQ | 500K Per Day',
    '14982': '3083 - Youtube Short Likes | 10K Per Day | 0 - 1 Hour Start Time',
    '15628': 'Youtube Short Views | 5 % Drop Possible | Lifetime Refill | 1 - 2K Per Day | 1 Hour Start Time',
    '15577': 'YouTube Live Stream View | Stay Time - 15 Minutes',
    '15578': 'YouTube Live Stream View | Stay Time - 30 Minutes',
    '15579': 'YouTube Live Stream View | Stay Time - 60 Minutes',
    '15580': 'YouTube Live Stream View | Stay Time - 90 Minutes',
    '15581': 'YouTube Live Stream View | Stay Time - 2 Hours',
    '15582': 'YouTube Live Stream View | Stay Time - 3 Hours',
    '15583': 'YouTube Live Stream View | Stay Time - 4 Hours',
    '15584': 'YouTube Live Stream View | Stay Time - 6 Hours',
    '15585': 'YouTube Live Stream View | Stay Time - 12 Hours',
    '15586': 'YouTube Live Stream View | Stay Time - 24 Hours',
    '15629': 'Youtube Live Stream Views + Likes [15 Minutes]',
    '15630': 'Youtube Live Stream Views + Likes [30 Minutes]',
    '15631': 'Youtube Live Stream Views + Likes [60 Minutes]',
    '15632': 'Youtube Live Stream Views + Likes [90 Minutes]',
    '15633': 'Youtube Live Stream Views + Likes [120 Minutes]',
    '15634': 'Youtube Live Stream Views + Likes [180 Minutes]',
    '14977': 'YouTube Comment Likes | 10K Per Day | Ultra Fast | 30 Days Refill',
    '15100': 'Youtube Indian Custom Comments | 30 Days Refill | Non Drop',
    '15101': 'Youtube Indian Custom Comments | Fast | 30 Days Refill | Non Drop',
    '15102': 'Youtube Custom Comments | Fast | 30 Days Refill | Non Drop',
    '15103': 'Youtube Custom Comments | Fast | 30 Days Refill | Non Drop',
    '15104': 'Youtube Custom Comments | Fast | 30 Days Refill | Non Drop',
    '15105': 'Youtube Indian Random Comments | Slow| Non Drop',
    '15106': 'Youtube Indian Custom Comments | Slow | 30 Days Refill | Non Drop',
    '15841': 'Facebook Followers | Page\\Profile | Non Drop | 30 Days Refill | 100K Per Day | Instant Start',
    '15690': 'Facebook Followers | Page\\Profile | Low Drop | No Refill | 30K Per Day | 0-1 Hour Start Time',
    '15691': 'Facebook Followers | Page\\Profile | Non Drop | 30 Days Refill | 100K Per Day | Instant Start',
    '15692': 'Facebook Followers | Page\\Profile | Non Drop | 365 Days Refill | 300K Per Day | Instant Start',
    '15693': 'Facebook Followers | Page\\Profile | Non Drop | Lifetime Refill | 300K Per Day | Instant Start',
    '15788': 'Facebook Followers | Page\\Profile | Non Drop | 365 Days Refill | 50K Per Day | Instant Start',
    '15848': 'Facebook Group Members | No Refill | 50K Per Day | 10 Minutes Time',
    '15849': 'Facebook Group Members | Lifetime Refill | 50K Per Day | 10 Minutes Time',
    '15842': 'Facebook Post Like | Non Drop | Super Fast | Instant | 300K Per Day',
    '14708': 'Facebook Post Likes | Non Drop | 30 Days Refill | 5-10K Per Day | 1 Hour Start Time',
    '15761': 'Facebook Page Likes and Followers | High Quality | 100K Per Day | No Refill | 0-1 Hour Start Time',
    '15762': 'Facebook Page Likes and Followers | High Quality | 100K Per Day | 30 Days Refill | 0-1 Hour Start Time',
    '15763': 'Facebook Page Likes and Followers | High Quality | 100K Per Day | 90 Days Refill | 0-1 Hour Start Time',
    '15764': 'Facebook Page Likes and Followers | High Quality | 100K Per Day | 365 Days Refill | 0-1 Hour Start Time',
    '15765': 'Facebook Page Likes and Followers | High Quality | 100K Per Day | Lifetime Refill | 0-1 Hour Start Time',
    '15780': 'Facebook Post Likes | Less Drop | No Refill | 50K Per Day | Instant Start',
    '15781': 'Facebook Post Likes | Low Drop | 30 Days Refill | 100K Per Day | Instant Start',
    '15782': 'Facebook Post Likes | Indian Mixed | Non Drop | 365 Days Refill | 100-200K Per Day | Instant Start',
    '15783': 'Facebook Post Likes | Indian Mixed | Non Drop | Lifetime Refill | 100-200K Per Day | Instant Start',
    '15694': 'Facebook Reels Views | Low Drop | 200K Per Day | No Refill | 1-6 Hours',
    '15766': 'Facebook Post Reaction | Likes 👍 | HQ | Non Drop | 5K Per hour | No Refill | Instant Start',
    '15767': 'Facebook Post Reaction | Love ♥️ | HQ | Non Drop | 5K Per hour | No Refill | Instant Start',
    '15768': 'Facebook Post Reaction | Care 🤗 | HQ | Non Drop | 5K Per hour | No Refill | Instant Start',
    '15769': 'Facebook Post Reaction | Wow 😲 | HQ | Non Drop | 5K Per hour | No Refill | Instant Start',
    '15770': 'Facebook Post Reaction | Haha 😂 | HQ | Non Drop | 5K Per hour | No Refill | Instant Start',
    '15771': 'Facebook Post Reaction | Sad 😢 | HQ | Non Drop | 5K Per hour | No Refill | Instant Start',
    '15772': 'Facebook Post Reaction | Angry 😡 | HQ | Non Drop | 5K Per hour | No Refill | Instant Start',
    '8345': 'Facebook Comment Likes | Drop Possible | 5 Days Refill',
    '8346': 'Facebook Comment Likes | No Drop | Lifetime Refill | 100-300K Per Day | 1 Hour Start Time',
    '8347': 'Facebook Costum Comments | 100 Per Day | No Refill | Unexpected Drop | 0-6 Hour Start Time',
    '8348': 'FB Comment Likes [No Drop] [Lifetime] [100-300/D] [0-8/H]',
    '8351': 'Facebook Random Comments | No Drop | 30 Days Refill | 100 Per Day | 0-24 Hour Start Time',
    '8352': 'Facebook custom Comments | No Drop | 30 Days Refill | 100 Per Day | 0-24 Hour Start Time',
    '9102': 'Facebook 60K Minutes | Monetization | 100K Per Day | 0-24 Hour Start Time | 120+ Minutes',
    '9103': 'Facebook 120K Minutes | Monetization | 100K Per Day | 0-24 Hour Start Time | 120+ Minutes'
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Set up Firebase auth listener
    if (window.firebaseAuth) {
        window.firebaseAuth.onAuthStateChanged(user => {
            currentUser = user;
            updateUI();
        });
    }

    // Set up form listeners
    setupFormListeners();
    
    // Show home page by default
    showPage('home');
});

// Page navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update URL hash
    window.location.hash = pageId;

    // Protect dashboard and payment pages
    if ((pageId === 'dashboard' || pageId === 'payment') && !currentUser) {
        showPage('login');
        showToast('Please login to access this page', 'error');
        return;
    }

    // Reset mobile menu
    closeMobileMenu();
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    // If not on home page, navigate there first
    if (!document.getElementById('homePage').classList.contains('active')) {
        showPage('home');
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    } else {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    
    mobileMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// Update UI based on auth state
function updateUI() {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const mobileUserMenu = document.getElementById('mobileUserMenu');

    if (currentUser) {
        // Desktop
        loginBtn.style.display = 'none';
        userMenu.style.display = 'flex';
        
        // Mobile
        mobileLoginBtn.style.display = 'none';
        mobileUserMenu.style.display = 'flex';
    } else {
        // Desktop
        loginBtn.style.display = 'inline-flex';
        userMenu.style.display = 'none';
        
        // Mobile
        mobileLoginBtn.style.display = 'block';
        mobileUserMenu.style.display = 'none';
    }
}

// Setup form listeners
function setupFormListeners() {
    // Auth form
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', handleAuth);
    }

    // Category select
    const categorySelect = document.getElementById('categorySelect');
    if (categorySelect) {
        categorySelect.addEventListener('change', updateCategory);
    }

    // Service select
    const serviceSelect = document.getElementById('serviceSelect');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', updateService);
    }

    // Social link input
    const socialLink = document.getElementById('socialLink');
    if (socialLink) {
        socialLink.addEventListener('input', updateLink);
    }

    // Quantity input
    const quantity = document.getElementById('quantity');
    if (quantity) {
        quantity.addEventListener('input', calculatePrice);
    }
}

// Switch between login and signup modes
function switchAuthMode(mode) {
    currentAuthMode = mode;
    
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const authButtonText = document.getElementById('authButtonText');
    const authSwitchText = document.getElementById('authSwitchText');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    const passwordHelp = document.getElementById('passwordHelp');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    
    if (mode === 'login') {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        authTitle.textContent = 'Sign in to MeraSMM';
        authSubtitle.textContent = 'Access your dashboard to place orders';
        authButtonText.textContent = 'Sign In';
        authSwitchText.innerHTML = 'Don\'t have an account? <button type="button" class="link-button" onclick="switchAuthMode(\'signup\')">Sign up here</button>';
        confirmPasswordGroup.style.display = 'none';
        passwordHelp.style.display = 'none';
        authSubmitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> <span id="authButtonText">Sign In</span>';
        
        // Remove required attribute from confirm password
        document.getElementById('confirmPassword').removeAttribute('required');
    } else {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        authTitle.textContent = 'Create MeraSMM Account';
        authSubtitle.textContent = 'Sign up to start growing your social media';
        authButtonText.textContent = 'Create Account';
        authSwitchText.innerHTML = 'Already have an account? <button type="button" class="link-button" onclick="switchAuthMode(\'login\')">Sign in here</button>';
        confirmPasswordGroup.style.display = 'block';
        passwordHelp.style.display = 'block';
        authSubmitBtn.innerHTML = '<i class="fas fa-user-plus"></i> <span id="authButtonText">Create Account</span>';
        
        // Add required attribute to confirm password
        document.getElementById('confirmPassword').setAttribute('required', 'required');
    }
}

// Handle authentication (login or signup)
async function handleAuth(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Validate passwords match for signup
    if (currentAuthMode === 'signup' && password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    const loadingText = currentAuthMode === 'login' ? 
        '<i class="fas fa-spinner fa-spin"></i> Signing in...' : 
        '<i class="fas fa-spinner fa-spin"></i> Creating account...';
    submitBtn.innerHTML = loadingText;
    submitBtn.disabled = true;

    try {
        if (currentAuthMode === 'login') {
            await window.firebaseAuth.signInWithEmailAndPassword(email, password);
            showToast('Login successful! Welcome to MeraSMM Dashboard', 'success');
        } else {
            await window.firebaseAuth.createUserWithEmailAndPassword(email, password);
            showToast('Account created successfully! Welcome to MeraSMM', 'success');
        }
        showPage('dashboard');
        
        // Reset form
        e.target.reset();
    } catch (error) {
        showToast(error.message || 'Authentication failed. Please try again.', 'error');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Handle Google Sign-In
async function signInWithGoogle() {
    const googleBtn = document.querySelector('.btn-google');
    const originalText = googleBtn.innerHTML;
    
    // Show loading state
    googleBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting to Google...';
    googleBtn.disabled = true;

    try {
        await window.firebaseAuth.signInWithGoogle();
        showToast('Google sign-in successful! Welcome to MeraSMM', 'success');
        showPage('dashboard');
        
        // Reset form
        const authForm = document.getElementById('authForm');
        if (authForm) {
            authForm.reset();
        }
    } catch (error) {
        showToast(error.message || 'Google sign-in failed. Please try again.', 'error');
    } finally {
        // Reset button
        googleBtn.innerHTML = originalText;
        googleBtn.disabled = false;
    }
}

// Handle logout
async function logout() {
    try {
        await window.firebaseAuth.signOut();
        showToast('Logged out successfully', 'info');
        showPage('home');
        
        // Reset order data
        currentOrder = {
            service: '',
            serviceRate: 0,
            quantity: 0,
            link: '',
            total: 0
        };
        
        // Reset form
        const orderForm = document.getElementById('orderForm');
        if (orderForm) {
            orderForm.reset();
        }
        
        // Hide price display
        const priceDisplay = document.getElementById('priceDisplay');
        if (priceDisplay) {
            priceDisplay.style.display = 'none';
        }
        
    } catch (error) {
        showToast('Logout failed', 'error');
    }
}

// Update category selection
function updateCategory() {
    const categorySelect = document.getElementById('categorySelect');
    const serviceSelect = document.getElementById('serviceSelect');
    const selectedCategory = categorySelect.value;
    
    // Clear service selection
    serviceSelect.innerHTML = '<option value="">Select Service</option>';
    
    if (selectedCategory && SERVICE_CATEGORIES[selectedCategory]) {
        // Enable service dropdown
        serviceSelect.disabled = false;
        
        // Populate services for selected category
        const services = SERVICE_CATEGORIES[selectedCategory].services;
        Object.keys(services).forEach(serviceKey => {
            const option = document.createElement('option');
            option.value = serviceKey;
            option.textContent = services[serviceKey].name;
            serviceSelect.appendChild(option);
        });
    } else {
        // Disable other inputs
        serviceSelect.disabled = true;
        document.getElementById('socialLink').disabled = true;
        document.getElementById('quantity').disabled = true;
        document.getElementById('submitOrderBtn').disabled = true;
    }
}

// Update service selection
function updateService() {
    const serviceSelect = document.getElementById('serviceSelect');
    const selected = serviceSelect.value;
    
    if (selected) {
        // Find service in categories
        let serviceData = null;
        Object.keys(SERVICE_CATEGORIES).forEach(categoryKey => {
            const category = SERVICE_CATEGORIES[categoryKey];
            if (category.services[selected]) {
                serviceData = category.services[selected];
            }
        });
        
        if (serviceData) {
            currentOrder.service = selected;
            currentOrder.serviceRate = serviceData.rate;
            
            // Update min/max quantities
            document.getElementById('minQty').textContent = serviceData.min;
            document.getElementById('maxQty').textContent = serviceData.max;
            
            // Enable inputs
            document.getElementById('socialLink').disabled = false;
            document.getElementById('quantity').disabled = false;
            document.getElementById('quantity').min = serviceData.min;
            document.getElementById('quantity').max = serviceData.max;
            
            // Update link placeholder
            const linkInput = document.getElementById('socialLink');
            switch(selected) {
                case 'instagram_followers':
                    linkInput.placeholder = 'Enter your Instagram profile URL';
                    break;
                case 'youtube_views':
                    linkInput.placeholder = 'Enter your YouTube video URL';
                    break;
                case 'jiohotstar_premium':
                    linkInput.placeholder = 'Enter your JioHotstar profile URL';
                    break;
            }
            
            calculatePrice();
        }
    } else {
        currentOrder.service = '';
        currentOrder.serviceRate = 0;
        document.getElementById('socialLink').disabled = true;
        document.getElementById('quantity').disabled = true;
        document.getElementById('submitOrderBtn').disabled = true;
    }
}

// Update link
function updateLink() {
    const socialLink = document.getElementById('socialLink');
    currentOrder.link = socialLink.value;
    
    updateSubmitButton();
}

// Calculate price based on quantity and service
function calculatePrice() {
    const quantityInput = document.getElementById('quantity');
    const quantity = parseInt(quantityInput.value) || 0;
    
    currentOrder.quantity = quantity;
    
    if (quantity > 0 && currentOrder.serviceRate > 0) {
        currentOrder.total = Math.round((quantity / 1000) * currentOrder.serviceRate);
        
        // Update price display
        const totalPrice = document.getElementById('totalPrice');
        if (totalPrice) {
            totalPrice.textContent = `₹${currentOrder.total.toFixed(2)}`;
        }
        
        // Enable submit button if all fields are filled
        updateSubmitButton();
    } else {
        currentOrder.total = 0;
        const totalPrice = document.getElementById('totalPrice');
        if (totalPrice) {
            totalPrice.textContent = '₹0.00';
        }
        updateSubmitButton();
    }
}

// Update submit button state
function updateSubmitButton() {
    const submitBtn = document.getElementById('submitOrderBtn');
    if (submitBtn) {
        const isValid = currentOrder.service && currentOrder.link && currentOrder.quantity > 0;
        submitBtn.disabled = !isValid;
    }
}

// Update proceed button state (for backward compatibility)
function updateProceedButton() {
    updateSubmitButton();
}

// Proceed to payment
function proceedToPayment() {
    if (!isOrderValid()) {
        showToast('Please complete all fields', 'error');
        return;
    }
    
    // Update payment page with order details
    document.getElementById('paymentService').textContent = SERVICE_NAMES[currentOrder.service];
    document.getElementById('paymentQuantity').textContent = currentOrder.quantity.toLocaleString();
    document.getElementById('paymentLink').textContent = currentOrder.link;
    document.getElementById('paymentTotal').textContent = `₹${currentOrder.total}`;
    document.getElementById('qrAmount').textContent = `₹${currentOrder.total}`;
    
    showPage('payment');
}

// Check if order is valid
function isOrderValid() {
    return currentOrder.service && currentOrder.link && currentOrder.quantity >= 1000;
}

// Copy UPI ID
async function copyUPI() {
    const upiId = 'merasmm@paytm';
    
    try {
        await navigator.clipboard.writeText(upiId);
        showToast('UPI ID copied to clipboard!', 'success');
    } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = upiId;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('UPI ID copied to clipboard!', 'success');
    }
}

// Send order to admin via WhatsApp
function sendToAdmin() {
    const transactionId = document.getElementById('transactionId').value.trim();
    
    if (!transactionId) {
        showToast('Please enter your transaction ID', 'error');
        return;
    }
    
    const message = generateWhatsAppMessage(transactionId);
    const whatsappUrl = `https://wa.me/918123456789?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Navigate to thank you page
    showPage('thankYou');
}

// Generate WhatsApp message
function generateWhatsAppMessage(transactionId) {
    return `Hello Admin, I've paid ₹${currentOrder.total}
Transaction ID: ${transactionId}
Service: ${SERVICE_NAMES[currentOrder.service]}
Quantity: ${currentOrder.quantity}
Link: ${currentOrder.link}`;
}

// Contact admin
function contactAdmin() {
    const whatsappUrl = `https://wa.me/9859130932?text=${encodeURIComponent('Hi, I need help with my order')}`;
    window.open(whatsappUrl, '_blank');
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastMessage = document.getElementById('toastMessage');
    
    // Set icon based on type
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
    };
    
    toastIcon.className = `toast-icon ${icons[type]}`;
    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;
    
    // Hide after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Handle browser back/forward
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash + 'Page')) {
        showPage(hash);
    }
});

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const sectionId = e.target.getAttribute('href').substring(1);
        scrollToSection(sectionId);
    }
});

// Add animation classes on scroll
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Initialize animations when page loads
window.addEventListener('load', addScrollAnimations);

// Hamburger animation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
});

// Add CSS for hamburger animation
const style = document.createElement('style');
style.textContent = `
.hamburger.active span:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
}
`;
document.head.appendChild(style);
