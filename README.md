# REFACE 👴🏿👦🏼

# OBOMUST?!?!?
[ADD OBAMUSK HERE]
## face swap api 

Here is an example

```
wget --quiet   --method=POST   --header='Content-Type: application/json'   --body-data='{
    "target_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/1280px-President_Barack_Obama.jpg",
    "source_url": "https://upload.wikimedia.org/wikipedia/commons/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg",
    "slider": 100,
    "adv_slider": 100
  }'   --output-document=-   http://localhost:5000/face_swap_urls
```