from flask import Flask, request, jsonify
from gradio_client import Client, file
from typing import Any, List

app = Flask(__name__)

def face_swap_local(target_path: str, source_path: str, slider: int = 100, adv_slider: int = 100, settings: List[str] = ["Adversarial Defense"], api_name: str = "/run_inference") -> Any:
    """
    Perform face swap using local image files.

    Args:
        target_path (str): Path to the target image file.
        source_path (str): Path to the source image file.
        slider (int, optional): Value for the slider parameter. Defaults to 100.
        adv_slider (int, optional): Value for the adv_slider parameter. Defaults to 100.
        settings (list[str], optional): List of settings to use. Defaults to ["Adversarial Defense"].
        api_name (str, optional): API name for the inference. Defaults to "/run_inference".

    Returns:
        Any: Result of the face swap.
    """
    client = Client("felixrosberg/face-swap")
    result = client.predict(
        target=file(target_path),
        source=file(source_path),
        slider=slider,
        adv_slider=adv_slider,
        settings=settings,
        api_name=api_name
    )
    return result

def face_swap_urls(target_url: str, source_url: str, slider: int = 100, adv_slider: int = 100, settings: List[str] = ["Adversarial Defense"], api_name: str = "/run_inference") -> Any:
    """
    Perform face swap using image URLs.

    Args:
        target_url (str): URL of the target image.
        source_url (str): URL of the source image.
        slider (int, optional): Value for the slider parameter. Defaults to 100.
        adv_slider (int, optional): Value for the adv_slider parameter. Defaults to 100.
        settings (list[str], optional): List of settings to use. Defaults to ["Adversarial Defense"].
        api_name (str, optional): API name for the inference. Defaults to "/run_inference".

    Returns:
        Any: Result of the face swap.
    """
    client = Client("felixrosberg/face-swap")
    result = client.predict(
        target=file(target_url),
        source=file(source_url),
        slider=slider,
        adv_slider=adv_slider,
        settings=settings,
        api_name=api_name
    )
    return result

@app.route('/face_swap_local', methods=['POST'])
def face_swap_local_route():
    data = request.json
    target_path = data.get('target_path')
    source_path = data.get('source_path')
    slider = data.get('slider', 100)
    adv_slider = data.get('adv_slider', 100)
    settings = data.get('settings', ["Adversarial Defense"])
    api_name = data.get('api_name', "/run_inference")

    if not target_path or not source_path:
        return jsonify({'error': 'Both target_path and source_path are required'}), 400

    try:
        result = face_swap_local(target_path, source_path, slider, adv_slider, settings, api_name)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/face_swap_urls', methods=['POST'])
def face_swap_urls_route():
    data = request.json
    target_url = data.get('target_url')
    source_url = data.get('source_url')
    slider = data.get('slider', 100)
    adv_slider = data.get('adv_slider', 100)
    settings = data.get('settings', ["Adversarial Defense"])
    api_name = data.get('api_name', "/run_inference")

    if not target_url or not source_url:
        return jsonify({'error': 'Both target_url and source_url are required'}), 400

    try:
        result = face_swap_urls(target_url, source_url, slider, adv_slider, settings, api_name)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
