import {View, Text, Button} from "react-native";
import * as Sentry from "@sentry/react-native";
import {tryCatchExample} from "@sentry/react-native/dist/js/playground/examples";
const Page = () => {
    const handleError = () => {
        try {
            throw new Error("This is a test error");

        }catch (error) {
            const eventId = Sentry.captureMessage('This is a test error');
            console.log(`Error captured with event ID: ${eventId}`);


            const userFeedback : Sentry.UserFeedback = {
                event_id: eventId,
                name: 'User Feedback',
                email: 'test@gmail.com',
                comments: 'This is a test error feedback',
            };

            Sentry.captureUserFeedback(userFeedback);
        }
    }


    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>This is Feed</Text>
            <Button title={"Test Sentry"} onPress={handleError}/>
        </View>
    );
}

export default Page;