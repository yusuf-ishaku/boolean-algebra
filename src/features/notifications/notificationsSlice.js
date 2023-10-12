import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";

import { client } from "../../api/client";

const notificationsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = notificationsAdapter.getInitialState();

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        allNotificationsRead(state, action){
          Object.values(state.entities).forEach(notification => {
            notification.read = true;
          })
        }

    },
    extraReducers(builder){
        builder.addCase(fetchNotifications.fulfilled, (state, action) =>{
            notificationsAdapter.upsertMany(state, action.payload)
            Object.values(state.entities).forEach(notification => {
                notification.isNew = !notification.read;
            })
            // state.sort((a, b) => b.date.localeCompare(a.date))
        })
    }
});
export default notificationsSlice.reducer;

export const { allNotificationsRead } = notificationsSlice.actions;

// export const selectAllNotifications = state => state.notifications;


export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, {getState}) =>{
        const allNotifications = selectAllNotifications(getState());
        const [latestNotification ] = allNotifications;
        const latestTimeStamp = latestNotification ? latestNotification.date : '';
        const response = await client.get(`/fakeApi/notifications?since=${latestTimeStamp}`);
        return response.data
    }
)

export const {selectAll: selectAllNotifications} = notificationsAdapter.getSelectors(state => state.notifications);