from flask import Flask, request, render_template


app = Flask(__name__, static_url_path="")


@app.route("/")
def home():
    x, y = request.args.get("x"), request.args.get("y")
    start_x, start_y = request.args.get("start-x"), request.args.get("start-y")

    start = None
    end = None

    if x is not None and y is not None:
        if start_x is not None and start_y is not None:
            start_x, start_y = int(start_x), int(start_y)
            x, y = int(x), int(y)

            start = min(start_x, x), min(start_y, y)
            end = max(start_x, x), max(start_y, y)
        else:
            start = int(x), int(y)

    return render_template("demo", start=start, end=end)


if __name__ == "__main__":
    app.run(host="::1")
