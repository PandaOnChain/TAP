from fastapi import FastAPI


app = FastAPI(title="The Almanac of Practice API")

@app.get("/")
def first():
    return {"message":"bolno"}
# app.include_router()


@app.post("/telegram")
def get_all_initdata(initdatafromtelegram: dict):
    print(initdatafromtelegram)
    return {"message":"OK"}
