from flask import Flask, request, render_template


app = Flask(__name__, static_url_path="")


def get_int(key):
    value = request.args.get(key)

    if not value:
        return None

    try:
        return int(value)
    except ValueError:
        return None


@app.route("/")
def home():
    x, y = get_int("x"), get_int("y")
    start_x, start_y = get_int("start-x"), get_int("start-y")

    start = None
    end = None

    if x is not None and y is not None:
        if start_x is not None and start_y is not None:
            start = min(start_x, x), min(start_y, y)
            end = max(start_x, x), max(start_y, y)
        else:
            start = x, y

    return render_template("demo.j2", start=start, end=end)


if __name__ == "__main__":
    app.run(host="::1")
