import React from "react";
import Typography from "@material-ui/core/Typography";

const BasicRecommendations = () => {
    return (
        <main className="sections" id="recommendationsPage">
            <section>
                <Typography variant="h1">Wie kann ich mich verhalten?</Typography>
            </section>
            <section className="contentBody">
                <Typography>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi veniam voluptatem dignissimos excepturi qui repellendus, sapiente eius sequi ducimus! Ab molestias consequatur debitis animi deserunt distinctio dolores, atque eveniet odit.
                </Typography>
                <Typography>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est veritatis quasi deleniti maiores dolorem voluptatum ad. Architecto obcaecati, repellendus, cupiditate distinctio aspernatur ex autem dolorum, maiores facilis modi voluptates corporis.
                </Typography>
                <Typography>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse alias a amet aut porro eaque quidem consectetur. Quo exercitationem nemo animi. Praesentium fuga repellat molestiae quibusdam? Adipisci fugit omnis laboriosam?
                </Typography>
            </section>
            <section>
                <Typography variant="h1">
                    Link ausgewählter Landkreis
                </Typography>
            </section>
        </main>
    );
};

export default BasicRecommendations